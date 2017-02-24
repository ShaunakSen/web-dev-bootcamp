// all middlewares go here

var CampGround = require('../models/capgrounds');
var Comment = require('../models/comments');

var middlewareObject = {};

middlewareObject.checkCampgroundOwnership = function (req, res, next) {
    // is user logged in
    if (req.isAuthenticated()) {

        CampGround.findById(req.params.id, function (err, foundCampGround) {
            if (err) {
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                // does user own the campground??
                // NOTE: foundCampGround.author.id is Object and req.user._id is a String
                // So solution is to use method equals() on the Object

                if (foundCampGround.author.id.equals(req.user._id)) {
                    // all ok
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObject.checkCommentOwnership = function (req, res, next) {

    // check if user is authenticated
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                // check if user is authorized
                if (foundComment.author.id.equals(req.user._id)) {
                    // all ok
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
};

middlewareObject.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        // flash message
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
};

module.exports = middlewareObject;