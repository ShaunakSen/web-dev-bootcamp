var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ejs = require("ejs");
var methodOverride = require('method-override');
var expressSanitizer = require('express-sanitizer');

var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));

// This should come after body parser
app.use(expressSanitizer());

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
    // sanitizing the data
    console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body);
    console.log("===============");
    console.log(req.body);
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
        if (err) {
            console.log(err);
            res.redirect("/blogs");
        } else {
            res.render("show.ejs", {blog: foundBlog});
        }
    });
});

// EDIT ROUTE

app.get("/blogs/:id/edit", function (req, res) {
    
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});


// UPDATE

app.put("/blogs/:id", function (req, res) {
    // sanitizing the data
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});


// DELETE

app.delete("/blogs/:id", function (req, res) {

    // Destroy bog
    Blog.findByIdAndRemove(req.params.id, function (err) {
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

app.listen(3000, function () {
    console.log("Blog server running....");
});