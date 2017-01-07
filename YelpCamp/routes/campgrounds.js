var express = require('express');
var router = express.Router();
var CampGround = require('../models/capgrounds');

router.get("/campgrounds", function (req, res) {
    // res.render("campgrounds", {campgrounds: campgrounds});

    // user info
    console.log(req.user);
    CampGround.find({}, function (err, campgrounds) {
        if (err) {
            console.log("Error...", err)
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    })
});

router.post("/campgrounds", function (req, res) {
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

router.get("/campgrounds/new", function (req, res) {
    // render form here
    res.render("campgrounds/new");

});

// SHOW
router.get("/campgrounds/:id", function (req, res) {
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

module.exports = router;
