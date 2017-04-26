var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Property = require('../models/property');

var router = express.Router();



router.route('/add_property')
.get(function(req,res,next){

	res.render('add_property.ejs');

})
.post(isLoggedIn,function(req, res, next){

	console.log(req.user);
	Property.create({
    	owner_id:req.user,
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
        res.send(properties);
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