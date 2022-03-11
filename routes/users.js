const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const users = require('../controllers/users');


router.route('/register')
    .get(catchAsync(users.renderRegisterForm))
    .post(catchAsync(users.registerUser));

router.route('/login')
    .get(catchAsync(users.renderLoginForm))
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), catchAsync(users.loginUser));

router.get('/logout', users.logoutUser);


module.exports = router;