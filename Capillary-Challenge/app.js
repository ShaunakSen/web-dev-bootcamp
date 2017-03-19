
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var expressSession = require('express-session');
var flash = require('connect-flash');
var cors = require('cors');
var User = require('./models/user');


var indexRoutes = require('./routes/index');

var app = express();

mongoose.connect("mongodb://localhost/capillary");


// To parse form data
app.use(bodyParser.urlencoded({extended: true}));

// To allow cross-origin requests(for development purpose only)
app.use(cors());


// Server up static directory
app.use(express.static(__dirname + "/public"));
console.log(__dirname);

app.use(flash());

app.use(expressSession({
    secret: "Little mini is very busy",
    resave: false,
    saveUninitialized: false
}));


// PASSPORT CONFIGURATION

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// User.authenticate(),User.serializeUser() and User.deserializeUser() are methods that come with passport-local-mongoose


// Set view engine to ejs
app.set("view engine", "ejs");

// middleware to pass data to templates

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


// use the routes

app.use(indexRoutes);


app.listen(8000, function () {
    console.log("Capillary App 2 has Started!!");
});