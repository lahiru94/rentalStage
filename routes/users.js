var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* add user. */
router.get('/add_user', function(req, res, next) {
  res.render('add_user', { title: 'Rental stage- sign up' });
});

module.exports = router;
