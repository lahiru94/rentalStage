var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fileUpload = require('express-fileupload');
var ImageResize = require('node-image-resize');
var fs = require('fs');

var Property = require('../models/property');
var Comment = require('../models/comment');
var Rating = require('../models/rating');
var RentRequest = require('../models/rent_request');
var User = require('../models/user');
var Agreement = require('../models/agreement');

var router = express.Router();



router.route('/add_property')
.get(isLoggedIn, function(req,res,next){

	res.render('add_property.ejs');

})
.post(isLoggedIn,function(req, res, next){
    User.findById(req.user._id,function(err,owner){
        Property.create({
        owner_id:req.user._id,
        owner_name:owner.first_name+" "+owner.last_name,
        title: req.body.title,
        district: req.body.district,
        address: req.body.address,
        rent: parseInt(req.body.rent),
        description: req.body.description
        }, function(err,property){
            if(err) throw err;
            res.redirect('/users/dashbord');
        }
        );        
    });
	
});

router.route('/upload_image/:id')
.post(isLoggedIn,function(req,res){
    console.log("test");
  var property_image = req.files.property_image;
 
  // Use the mv() method to place the file somewhere on your server 
  property_image.mv('../data/images/filename.jpg', function(err) {
    if (err) return err;
    res.redirect('/property/property_profile/'+req.params.id);
  });
});


router.route('/property_feed')
.get(isLoggedIn,function(req,res,next){
    Property.find({},function(err,properties){
        if(err) throw err;
        res.render('property_feed.ejs',{'properties':properties});
    });
});





router.route('/property_profile/:id')
.get(isLoggedIn,function(req,res,next){
    Comment.find({property_id:req.params.id},function(err,comment,next){
        console.log(comment);
        Property.findById(req.params.id,function(err,property,next){
            res.render('property_profile.ejs',{'property':property,'comments':comment});
            if(err) throw err;
        });
    });

    
});

router.route('/my_property_profile/:id')
.get(isLoggedIn,function(req,res,next){
    Comment.find({property_id:req.params.id},function(err,comment,next){
        Property.findById(req.params.id,function(err,property,next){
            RentRequest.find({property_id:req.params.id,status:"pending"},function(err,requests){
                if(err) throw err;
                res.render('my_property_profile.ejs',{'property':property,'comments':comment,'requests':requests});
            });
            
        });
    });

    
});



router.route('/review/:id')//here id is the property id
.post(isLoggedIn,function(req,res,next){
    User.findById(req.user._id,function(err,user){
        Comment.create({
            property_id:req.params.id,
            commenter_id:req.user._id,
            text:req.body.text,
            rating:req.body.rating,
            commenter_name:user.first_name+" "+user.last_name
        },function(err,comment){
            Comment.find({property_id:req.params.id},function(err,comments){
                count = comments.length;
                var tot = 0;
                for (var i = 0; i < count; i++) {
                    tot = tot + comments[i].rating;
                }
                var new_rating = tot/count;
                Property.findByIdAndUpdate(req.params.id,{rating:new_rating},function(err,property){
                    if(err) throw err;
                    res.redirect('/property/property_profile/'+comment.property_id);
                });
            });
            
        });
    });
    
})
.get(isLoggedIn,function(req,res,next){
    req.send('sending comments for requested property');
});


router.route('/request/:id')  //here id is the property id
.post(isLoggedIn,function(req,res,next){
    User.findById(req.user._id,function(err,user){
        Property.findById(req.params.id,function(err,property){
        RentRequest.create({
            property_id :req.params.id,
            requester_id :req.user._id,
            requester_name :user.first_name+user.last_name,
            reciever_id:property.owner_id,
            message:req.body.message
            },function(err,rental_request){
                if(err) throw err;
                res.redirect('/property/property_profile/'+rental_request.property_id);
        });
    });    
    });   
});




router.route('/reserve/:id')//request id
.get(isLoggedIn,function(req,res,next){
    RentRequest.findByIdAndUpdate(req.params.id,{status:"accpeted"},function(err,rent_request){
        Agreement.create({
            title       : "Pending agreement for ",
            property_id : rent_request.property_id,
            landlord_id : rent_request.reciever_id,
            tenant_id   : rent_request.requester_id,
        },function(err,agreement){
            RentRequest.update({
                property_id : rent_request.property_id,
                status: "pending"
            },{status:"rejected"},
            {"multi":true},function(err){
                Property.findByIdAndUpdate(rent_request.property_id,{status:"reserved"},function(err,property){
                    Agreement.findByIdAndUpdate(agreement._id,{rent:property.rent},function(err,agreement2){
                        res.redirect('/property/my_property_profile/'+rent_request.property_id);
                    });  
                });
                
            });
            
        });
    });
});

router.route('/reject_request/:id')
.get(isLoggedIn,function(req,res){
    RentRequest.findByIdAndUpdate(req.params.id,{status:"rejected"},function(err,request){
        res.redirect('/users/dashbord/');  
    });
});





//auth
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}
module.exports = router;