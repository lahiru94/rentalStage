var express = require('express');
var router = express.Router();

/* langing page */
router.get('/', function(req, res, next) {
  res.render('landing', { title: 'Rental Stage' });
});

/* login page */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Rental stage-login' });
});

/* signup page */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Rental stage-sign up' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Welcome to Rental Stage' });
});

module.exports = router;
