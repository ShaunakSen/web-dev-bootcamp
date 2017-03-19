var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

router.get("/", function (req, res) {
    res.render("landing");
});

// AUTH ROUTES

// show register form

router.get("/register", function (req, res) {
    res.render("register");
});

// handle register logic

router.post("/register", function (req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        // user is newly created user
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to Yelp Camp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// SHOW LOGIN FORM
router.get("/login", function (req, res) {
    res.render("login");
});

// handle login logic

// the middleware uses authenticate method which authenticates user..if it works it redirects somewhere else somewhere else

router.post("/login", passport.authenticate("local",
    {successRedirect: "/campgrounds", failureRedirect: "/login"}), function (req, res) {
});

// logout

router.get("/logout", function (req, res) {
    req.logout();
    // flash message

    // req.flash("success", "Logout successful");
    res.redirect("/campgrounds");
});



module.exports = router;