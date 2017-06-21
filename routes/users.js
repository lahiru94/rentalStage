var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var User = require('../models/user');
var RentRequest = require('../models/rent_request');
var Property = require('../models/property');
var Agreement = require('../models/agreement');
var Notification = require('../models/notification');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({},function(err,user){
  	if(err) throw err;
  	res.json(user);
  });
});

/* add user. */
router.route('/add_user')
.get(isLoggedIn,function(req, res, next) {
  res.render('add_user', { title: 'Rental stage- sign up' });
})

/* submit user. */
.post(function(req, res, next) {
	User.create(req.body,function(err,user){
		if(err) throw err;
		console.log('User added!');
		var id = user._id;

		// res.writeHead(200,{
		// 	'Content-Type': 'text/plain'
		// });
		res.send('added user with id: '+ id);
	});

});

/* view profile */
router.get('/profile', isLoggedIn, function(req, res) {
        res.render('user_profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
});

/* view other profile */
router.get('/profile/:id', isLoggedIn, function(req, res) {
      User.findById(req.params.id,function(err,user){
        res.render('user_profile.ejs', {
            'user' : user // get the user out of session and pass to template
        });
      });
        
});

/* view dashbord*/
router.get('/dashbord', isLoggedIn, function(req, res) {
      RentRequest.find({reciever_id:req.user._id,status:"pending"},function(err, requests){
        if(err) throw err;
        Property.find({owner_id:req.user._id},function(err,properties){
          Agreement.find({$or:[{landlord_id:req.user._id,status:"pending"},{landlord_id:req.user._id,status:"active"}]},function(err,agreements_landlord){
            Agreement.find({$or:[{tenant_id:req.user._id,status:"pending"},{tenant_id:req.user._id,status:"active"}]},function(err,agreements_tenant){
              Notification.find({reciever_id:req.user._id,status:"unseen"},function(err,notifications){
                res.render('dashbord.ejs',
                {
                 'rent_requests':requests,
                 'properties':properties,
                 'agreements_tenant':agreements_tenant,
                 'agreements_landlord':agreements_landlord,
                 'notifications':notifications
              });
              })
            });
          });  
        });
      });
        
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}



module.exports = router;
