var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Property = require('../models/property');
var Comment = require('../models/comment');
var Rating = require('../models/rating');
var RentRequest = require('../models/rent_request');

var router = express.Router();



router.route('/add_property')
.get(function(req,res,next){

	res.render('add_property.ejs');

})
.post(isLoggedIn,function(req, res, next){

	Property.create({
    	owner_id:req.user.email,
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



router.route('/review/:id')//here id is the property id
.post(isLoggedIn,function(req,res,next){
    Comment.create({
        property_id:req.params.id,
        commenter_id:req.user._id,
        text:req.body.text
    },function(err,comment){
        if(err) throw err;
        res.redirect('/property/property_profile/'+comment.property_id);
    });
})
.get(isLoggedIn,function(req,res,next){
    req.send('sending coments for requested property');
});


router.route('/request/:id')  //here id is the property id
.post(isLoggedIn,function(req,res,next){
    RentRequest.create({
        property_id :req.params.id,
        requester_id :req.user._id,
        requester_name :'name',
        message:req.body.message
    },function(err,rental_request){
        if(err) throw err;

        res.redirect('/property/property_profile/'+rental_request.property_id);
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