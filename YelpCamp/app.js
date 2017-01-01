var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var CampGround = require('./models/capgrounds');
var Comment = require('./models/comments');
var seedDB = require('./seeds');


var app = express();

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));
console.log(__dirname);
seedDB();

// Setting up our schema


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
            res.render("campgrounds/index", {campgrounds: campgrounds})
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
    res.render("campgrounds/new");

});

// SHOW
app.get("/campgrounds/:id", function (req, res) {
    var id = req.params.id;
    CampGround.findById(id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


// =================================
// Comments Routes

app.get("/campgrounds/:id/comments/new", function (req, res) {
    CampGround.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function (req, res) {
    // lookup campground
    CampGround.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //  create new comment
            // req.body.comment contains text and author of comment
            Comment.create(req.body.comment, function (err, comment) {
               if(err){
                   console.log(err);
               } else {
                   //  connect new comment to campground
                   campground.comments.push(comment);
                   campground.save(function (err) {
                       if(err){
                           console.log(err)
                       } else {
                           //  redirect to campground show page
                           res.redirect("/campgrounds/" + campground._id);
                       }
                   });
               }
            });
        }
    });
});


app.listen(3000, function () {
    console.log("YelpCamp has Started!!");
});