// =================================
// Comments Routes

var express = require('express');
var router = express.Router();
var CampGround = require('../models/capgrounds');
var Comment = require('../models/comments');
var middleware = require('../middleware');

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function (req, res) {
    CampGround.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function (req, res) {
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
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {

                    // add username and id to comment
                    // here we have access to req.user as we get to this code only if we are logged in

                    console.log("username is:" + req.user.username);
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    //  connect new comment to campground
                    campground.comments.push(comment);
                    campground.save(function (err) {
                        if (err) {
                            console.log(err)
                        } else {
                            //  redirect to campground show page
                            req.flash("success", "Successfully added comment!");
                            res.redirect("/campgrounds/" + campground._id);
                        }
                    });
                }
            });
        }
    });
});

// EDIT

router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

// UPDATE

router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY

router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            res.redirect("back");
        } else {
            // redirect back to show page
            res.flash("success", "Comment deleted!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});



module.exports = router;
