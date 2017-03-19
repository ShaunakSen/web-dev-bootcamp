var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Games = require('../models/games');
var User = require('../models/user');
var middleware = require('../middleware');


router.use(bodyParser.json());

router.get("/", function (req, res) {
    Games.find({}, function (err, foundGames) {
        if(err){
            console.log(err);
        } else {
            res.render("index", {games: foundGames})
        }
    })
});

router.get("/api/games", middleware.isLoggedIn, function (req, res) {
    Games.find({}, function (err, foundGames) {
        if(err){
            console.log(err);
        } else {
            res.json(foundGames);
        }
    })
});



// TEST ROUTES

router.get("/success", function (req, res) {
    res.send("Success!!");
});

router.get("/failed", function (req, res) {
    res.send("Failure!!");
});


// REGISTRATION ROUTE

router.post("/register", function (req, res) {
    var newUser = new User({username: req.body.username, full_name: req.body.full_name});
    User.register(newUser, req.body.password, function (err, user) {
        // user is newly created user
        if (err) {
            console.log(err.message);
            req.flash("error", err.message);
            return res.render("index", {games: null});
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to game Viewer App " + user.full_name);
            res.redirect("/");
        });
    });
});

// handle login logic

// the middleware uses authenticate method which authenticates user..if it works it redirects somewhere else somewhere else

router.post("/login", passport.authenticate("local",
    {successRedirect: "/", failureRedirect: "/failed"}), function (req, res) {
});

// logout

router.get("/logout", function (req, res) {
    req.logout();
    // flash message

    req.flash("success", "Logout successful");
    res.redirect("/");
});




module.exports = router;
