// =================================
// Comments Routes

var express = require('express');
var router = express.Router();
var CampGround = require('../models/capgrounds');
var Comment = require('../models/comments');

router.get("/campgrounds/:id/comments/new", isLoggedIn, function (req, res) {
    CampGround.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

router.post("/campgrounds/:id/comments", isLoggedIn, function (req, res) {
    // lookup campground
    CampGround.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //  create new comment
            // req.body.comment contains text and author of comment
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    //  connect new comment to campground
                    campground.comments.push(comment);
                    campground.save(function (err) {
                        if (err) {
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

// middleware

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
}

module.exports = router;
