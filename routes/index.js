var express = require('express');
var router = express.Router();
var passport = require('passport');

/* langing page */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Rental Stage-login' });
});

/* login page */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Rental stage-login' });
});

router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
}));

/* signup page */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Rental stage-sign up' });
});

/* GET home page. */
router.get('/home', isLoggedIn,function(req, res, next) {
  res.render('index',{
            user : req.user // get the user out of session and pass to template
        });
});

router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

/*logout*/
router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
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
