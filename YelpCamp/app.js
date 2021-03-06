var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var expressSession = require('express-session');
var CampGround = require('./models/capgrounds');
var Comment = require('./models/comments');
var User = require('./models/user');
var seedDB = require('./seeds');


var app = express();

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));
console.log(__dirname);
seedDB();

app.use(expressSession({
    secret: "Little mini is very busy",
    resave: false,
    saveUninitialized: false
}));


// PASSPORT CONFIGURATION

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// User.authenticate(),User.serializeUser() and User.deserializeUser() are methods that come with passport-local-mongoose


app.set("view engine", "ejs");

// middleware to pass data to templates

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
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

app.get("/campgrounds/:id/comments/new", isLoggedIn, function (req, res) {
    CampGround.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function (req, res) {
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
                            res.redirect("/campgrounds/" + campground._id);
                        }
                    });
                }
            });
        }
    });
});


// AUTH ROUTES

// show register form

app.get("/register", function (req, res) {
    res.render("register");
});

// handle register logic

app.post("/register", function (req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        // user is newly created user
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/campgrounds");
        });
    });
});

// SHOW LOGIN FORM
app.get("/login", function (req, res) {
    res.render("login");
});

// handle login logic

// the middleware uses authenticate method which authenticates user..if it works it redirects somewhere else somewhere else

app.post("/login", passport.authenticate("local",
    {successRedirect: "/campgrounds", failureRedirect: "/login"}), function (req, res) {
});

// logout

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

// middleware

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
}


app.listen(3000, function () {
    console.log("YelpCamp has Started!!");
});