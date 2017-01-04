var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var expressSession = require('express-session');


var User = require('./models/user');

mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

// ================================
// CONFIGURATION STUFF

app.use(expressSession({
    secret: "little mini is very busy",
    resave: false,
    saveUninitialized: false
}));

// tell express to use passport

app.use(passport.initialize());
app.use(passport.session());

// These 2 methods are very important
// serialize: encoding data and putting it back in the session
// deserialize: taking data from session and decoding it

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ================================
// CONFIGURATION STUFF ENDS


// ROUTES

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/secret", function (req, res) {
    res.render("secret");
});

app.get("/register", function (req, res) {
    res.render("register");
});

// handling user sign up

app.post("/register", function (req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
        if(err){
            console.log(err);
            return res.render("register");
        }

        console.log(user);
        // log the user in
        passport.authenticate("local")(req, res, function () {
            res.redirect("/secret");
        });
    });
});



app.listen(3000, function () {
    console.log("Auth server started...");
});