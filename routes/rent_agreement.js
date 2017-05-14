var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Property = require('../models/property');
var Comment = require('../models/comment');
var Rating = require('../models/rating');
var RentRequest = require('../models/rent_request');
var User = require('../models/user');
var Agreement = require('../models/agreement');

var router = express.Router();

router.route('/activate/:id')//this id is the agreement id
.get(isLoggedIn,function(req,res,next){
	Agreement.findById(req.params.id,function(err,agreement){
		res.render('activate_agreement.ejs',{'agreement':agreement});
	});
})
.post(isLoggedIn,function(req,res,next){
	Agreement.findByIdAndUpdate(req.params.id,
		{
			title     : req.body.title,
			start_date: req.body.start_date,
			end_date  : req.body.end_date,
			status    : "active" 
		},
		function(err,agreement){
			Property.findByIdAndUpdate(agreement.property_id,{status:"rented"},function(err,property){
				if (err) throw err;
				res.redirect('/users/dashbord');
			});
			
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