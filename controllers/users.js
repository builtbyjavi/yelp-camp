const User = require('../models/user');
const passport = require('passport');


module.exports.renderRegisterForm = async (req, res) => {
    res.render('users/register');
}

module.exports.registerUser = async (req, res, next) => {
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'WELCOME TO YELPCAMP');
            res.redirect('/campgrounds');
        })
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.renderLoginForm = async (req, res) => {
    res.render('users/login');
}

module.exports.loginUser = async (req, res) => {
    req.flash('success', 'WELCOME BACK');
    const redirectUrl = req.session.redirectUrl || '/campgrounds';
    delete req.session.redirectUrl;
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req, res) => {
    req.logout();
    req.flash('success', 'GOODBYE');
    res.redirect('/campgrounds');
}
