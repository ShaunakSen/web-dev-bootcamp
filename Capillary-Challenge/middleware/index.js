// all middlewares go here

var User = require('../models/user');

var middlewareObject = {};

middlewareObject.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        // flash message
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/");
    }
};

module.exports = middlewareObject;