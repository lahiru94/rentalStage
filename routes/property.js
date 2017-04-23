var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Property = require('../models/property');

var router = express.Router();

router.route('/add_property')
.get(function(req,res,next){
	res.render('add_property.ejs');
})
.post(function(req, res, next){
	res.send('adding property');
});

module.exports = router;