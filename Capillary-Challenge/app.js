
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');


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

// Set view engine to ejs
app.set("view engine", "ejs");

// middleware to pass data to templates

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});


// use the routes

app.use(indexRoutes);


app.listen(8000, function () {
    console.log("Capillary App 2 has Started!!");
});