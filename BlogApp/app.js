var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ejs = require("ejs");

var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

// Set up mongoose
mongoose.connect("mongodb://localhost/blog_app");

// Scheme: title, image, body, created

var blogSchema = new mongoose.Schema({
    title: String,
    image: {
        type: String,
        default: "http://placehold.it/350x200"
    },
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});

var Blog = mongoose.model("Blog", blogSchema);


/*Blog.create({
 title: "SASS vs SCSS",
 image: "http://combiboilersleeds.com/images/sassy/sassy-5.jpg",
 body: "SASS is way cleaner.. follows python like syntax"
 }, function (err, blog) {
 if (err) {
 console.log("Error:", err);
 } else {
 console.log("created document");
 console.log(blog);
 }
 });*/

// RESTFUL ROUTES

app.get("/", function (req, res) {
    res.redirect("/blogs");
});

app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("index", {blogs: blogs});
        }
    });
});

// Creating the new route: CREATE

app.get("/blogs/new", function (req, res) {
    res.render("new.ejs");
});

app.post("/blogs", function (req, res) {
    // CREATE BLOG
    //  THEN REDIRECT

    Blog.create(req.body.blog, function (err, newBlog) {
        if (err) {
            res.render("new")
        } else {
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE

app.get("/blogs/:id", function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
       if(err){
           console.log(err);
           res.redirect("/blogs");
       } else {
           res.render("show.ejs", {blog: foundBlog});
       }
    });
});


app.listen(3000, function () {
    console.log("Blog server running....");
});