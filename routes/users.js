var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var User = require('../models/user');

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
.get(function(req, res, next) {
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

module.exports = router;
