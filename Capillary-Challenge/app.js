var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var expressSession = require('express-session');
var flash = require('connect-flash');
var cors = require('cors');
var User = require('./models/user');
var Games = require('./models/games');
var request = require('request');
var fs = require('fs');


var indexRoutes = require('./routes/index');

var app = express();

mongoose.connect("mongodb://localhost/test_cap");


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

// Get the data

request.get('http://hck.re/fGVUJw', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var csv = body;
        console.log(typeof csv);
        var lineList = csv.split('\n');
        lineList.shift(); // Shift the headings off the list of records.
        seed(lineList);
    }
});


function seed(lineList) {
    Games.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            var allDocs = [];
            while (lineList.length != 1) {
                var firstLine = lineList.shift();
                var values = firstLine.split(',');
                var doc = {};
                // console.log(values);
                doc.title = values[0];
                doc.platform = values[1];
                doc.score = values[2];
                doc.genre = values[3];
                doc.editors_choice = values[4];
                allDocs.push(doc);
            }

            console.log(allDocs);
            Games.insertMany(allDocs, function (err, docs) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(allDocs)
                }
            });
        }
    })
}



app.listen(8000, function () {
    console.log("Capillary App 2 has Started!!");
});