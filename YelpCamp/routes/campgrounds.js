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

router.post("/campgrounds", isLoggedIn, function (req, res) {
    // get data from form and add to array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    // user data
    var author = {id: req.user._id, username: req.user.username};
    var newCampground = {name: name, image: image, description: description, author: author};
    // Create new campground and save to db
    CampGround.create(newCampground, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            //  redirect to campgrounds
            console.log(campground);
            res.redirect("/campgrounds");
        }
    });
});

router.get("/campgrounds/new", isLoggedIn, function (req, res) {
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

// EDIT CAMPGROUND

router.get("/campgrounds/:id/edit", function (req, res) {
    CampGround.findById(req.params.id, function (err, foundCampGround) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCampGround});
        }
    });
});

// UPDATE ROUTE

router.put("/campgrounds/:id", function (req, res) {
    // find and update campground
    CampGround.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampGround) {
        if(err){
            redirect("/campgrounds");
        } else {
            // redirect to show page
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY ROUTE

router.delete("/campgrounds/:id", function (req, res) {
    CampGround.findByIdAndRemove(req.params.id, function (err) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});


// middleware

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}

module.exports = router;
