// REDUCED app.js file

// ====Refer to app.js for development purpose====


var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var expressSession = require('express-session');
var methodOverride = require('method-override');
var CampGround = require('./models/capgrounds');
var Comment = require('./models/comments');
var User = require('./models/user');
var seedDB = require('./seeds');


// require Routes

var commentRoutes = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds');
var indexRoutes = require('./routes/index');

var app = express();

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));
console.log(__dirname);

app.use(methodOverride("_method"));

app.use(flash());


// seed the database
// seedDB();

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


app.set("view engine", "ejs");

// middleware to pass data to templates

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


// use the routes
app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(indexRoutes);


app.listen(3000, function () {
    console.log("YelpCamp has Started!!");
});