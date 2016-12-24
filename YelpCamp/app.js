var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

// Setting up our schema

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});


var CampGround = mongoose.model("Campground", campgroundSchema);

/*CampGround.create({
 name: "Granite Hill",
 image: "https://images.pexels.com/photos/167701/pexels-photo-167701.jpeg?h=350&auto=compress",
 description: "This is a huge granite hill. No bathrooms, no water.. Beautiful granite"
 }, function (err, campground) {
 if (err) {
 console.log(err)
 } else {
 console.log("Created campground");
 console.log(campground);
 }
 });*/



app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    // res.render("campgrounds", {campgrounds: campgrounds});
    CampGround.find({}, function (err, campgrounds) {
        if (err) {
            console.log("Error...", err)
        } else {
            res.render("index", {campgrounds: campgrounds})
        }
    })
});

app.post("/campgrounds", function (req, res) {
    // get data from form and add to array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    // Create new campground and save to db
    CampGround.create(newCampground, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            //  redirect to campgrounds
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function (req, res) {
    // render form here
    res.render("new.ejs");

});

// SHOW
app.get("/campgrounds/:id", function (req, res) {
    var id = req.params.id;
    CampGround.findById(id, function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});


app.listen(3000, function () {
    console.log("YelpCamp has Started!!");
});