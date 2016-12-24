var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// Set up mongoose
mongoose.connect("mongodb://localhost/blog_app");

// Scheme: title, image, body, created

var blogSchema = new mongoose.Schema({
    title: String,
    image: {type: String, default: "http://placehold.it/350x200"},
    body: String,
    created: {type: Date, default: Date.now}
});


app.listen(3000, function(){
    console.log("Blog server running....");
});










