By default express does not serve any file at all except the views directory

We need to tell express explicitly to serve directory

There is a diff bw /app.css and app.css

/app.css : look not in same directory but in root directory


YelpCamp
________________

Mongo Commands:

use demo
db.dogs.insert({name:"Rusty", breed: "Mutt"})
show collections
dogs
 db.dogs.find()
{ "_id" : ObjectId("585bf4bb753d9d94fc519773"), "name" : "Rusty", "breed" : "Mutt" }
db.dogs.find({name:"Rusty"})
{ "_id" : ObjectId("585bf4bb753d9d94fc519773"), "name" : "Rusty", "breed" : "Mutt" }
db.dogs.update({name: "Lulu"}, {breed: "Labradoodle"})
-- completely overwrites
db.dogs.find()
{ "_id" : ObjectId("585bf4bb753d9d94fc519773"), "name" : "Rusty", "breed" : "Mutt" }
{ "_id" : ObjectId("585bf520753d9d94fc519774"), "name" : "Lucy", "breed" : "Mutt" }
{ "_id" : ObjectId("585bf578753d9d94fc519775"), "breed" : "Labradoodle" } --> overwritten


If we dont want it to be overwritten:
db.dogs.update({name: "Rusty"},{$set:{name:"Tater", isCute: true}})
db.dogs.remove({breed: "Labradoodle"})->remove


Mongoose:

Mongoose is a package which helps us interact with mongodb inside js files.
it is basically a js layer on top of mongodb


In Databases/cats.js

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/cat_app");

cat_app is the name of the db
If it is not there it will get created

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});


This is just a nice way of providing structure
But it DOES NOT mean that we cant add new stuff or leave certain things off

// takes the cat schema and compiles it into a model and stores in var Cat

var Cat = mongoose.model("Cat", catSchema);



RESTful Routes
___________________

INDEX Route:    /dogs           GET     Display a list of all dogs
NEW Route:      /dogs/new       GET     Displays form to make a new dog
CREATE Route:   /dogs           POST    Add new dog to db
SHOW            /dogs/:id       GET     Shows info about one dog
EDIT            /dogs/:id/edit  GET     Show edit form for one dog
UPDATE          /dogs/:id       PUT     Update a particular dog; then redirect
DESTROY         /dogs/:id       DELETE  Delete a particular dog; then redirect

REST - a mapping bw HTTP routes and CRUD

Its a pattern of defining our routes

Blog - our entity


____________________

<p><%= blog.body %></p>

here if blog.body contains <strong>Hi</strong>
it WILL NOT evaluate the HTML. it will display it as <strong>Hi</strong> only
But if we have <p><%- blog.body %></p>
It will evaluate HTML and sho hi in bold !!



______________________________________________________________


HTML forms do not support PUT requests

They ONLY support GET and POST

So of we use PUT entire data of form ie name(key) and value pairs will be sent in query string

So there is a workaround - Method Override

So it is a simple package to install and we just tell Express to use it

<form action="/blogs/<%= blog._id %>?_method=PUT" method="post" class="ui form">

This will send a regular post req
but it has in query string _method=PUT and it will be treated as a PUT request
Similarly if _method=DELETE it will work as a delete request

var methodOverride = require('method-override');
app.use(methodOverride("_method"));

Now our app will look for any url that has _method=XYZ
and it will treat req as XYZ req

______________
findBiIdAndUpdate syntax:

Blog.findByIdAndUpdate(id, newData, callback)


Now say we wanna display HTML formatting in the blog posts
so we have to use <%-  %> tags
now very easily users can hack into our sites. They can type in <script> tags into our forms
and our app will evaluate them
We need to stop this ie we need to sanitize the data
This is done using express sanitizer

var expressSanitizer = require('express-sanitizer');

// This should come after body parser
app.use(expressSanitizer());

This has to be used in CREATE and UPDATE

app.post("/blogs", function (req, res) {
    // CREATE BLOG
    //  THEN REDIRECT
    // sanitizing the data
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function (err, newBlog) {
        if (err) {
            res.render("new")
        } else {
            res.redirect("/blogs");
        }
    });
});

{ blog:
   { title: 'DEMO',
     image: 'abcd',
     body: '<h1>ok</h1>\r\n<script>alert("HACKED");</script>' } }
===============
{ blog: { title: 'DEMO', image: 'abcd', body: '<h1>ok</h1>\r\n' } }


similarly before we update we need to sanitize


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



req.body.blog.body = req.sanitize(req.body.blog.body);
This code can be put in a Middleware

We will do it later


Data Associations
____________________________

They allow us to have multiple collections in our db that are related to one another

Association Types:
one:one
one:many
many:many

One:one

Employee and title

One:Many

One user can have multiple photos

Many:Many

Students and courses
Authors an Books


One to many association bw 2 mongoose models by Embedding Data
___________________________________________________________________________

Let us assume we have user ad posts

mkdir Associations

Follow code in embed.js
_______________________________


By using Object References
__________________________


Instead of storing all posts for a user in user collection we simply store reference ie the ids
to the posts

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});

postModel.create({
    title: "hungry",
    content: "feeling hungry"
}, function (err, post) {
    // find a user
    User.findOne({email: "mini@blaah.com"}, function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            // add the post into the user's posts
            foundUser.posts.push(post);
            foundUser.save(function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        }
    });
});

The data returned will look like:

{ _id: 586419159da4884625b63de5,
  email: 'mini@blaah.com',
  name: 'Little mini',
  __v: 1,
  posts: [ 58641ea460612548502020cf ] }


Notice posts only contains the id

When we add yet another post:

{ _id: 586419159da4884625b63de5,
  email: 'mini@blaah.com',
  name: 'Little mini',
  __v: 2,
  posts: [ 58641ea460612548502020cf, 58641f6d4273e3489821222d ] }


How to use this id to find correct post?

// Find user and find all posts by that user
// populate("posts") populates the field posts by object ids


User.findOne({email: "mini@blaah.com"}).populate("posts").exec(function (err, user) {
    if(err){
        console.log(err)
    }else {
        console.log(user);
    }
});

Output
________________


{ _id: 586419159da4884625b63de5,
  email: 'mini@blaah.com',
  name: 'Little mini',
  __v: 2,
  posts:
   [ { _id: 58641ea460612548502020cf,
       title: 'hungry',
       content: 'feeling hungry',
       __v: 0 },
     { _id: 58641f6d4273e3489821222d,
       title: 'hungry again !!',
       content: 'feeling hungry again..',
       __v: 0 } ] }

When to use embed and when to use references?

It depends.. on the app

module.exports
__________________

helps us clean up our code; makes it more modular


YelpCamp
_____________________

Creating seeds.js


var mongoose = require('mongoose');

var CampGround = require('./models/capgrounds');


// Clear everything

function seedDB() {

    CampGround.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Cleared Camp Grounds...");
        }
    });
}

module.exports = seedDB;


This clears our db every time server starts

Modifying seeds.js to add in a set of data


function seedDB() {

    // Remove camp grounds
    CampGround.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Cleared Camp Grounds...");
        }
    });

    // Add in some camp grounds

    data.forEach(function (seed) {
        CampGround.create(seed, function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Added a Camp Grounds...");
            }
        })
    });

    // Add a few comments
}

But here it might so happen that first camp grounds are added and then they are removed

So we need to put the add camp ground code in callback

function seedDB() {

    // Remove camp grounds
    CampGround.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Cleared Camp Grounds...");
            // Add in some camp grounds

            data.forEach(function (seed) {
                CampGround.create(seed, function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Added a Camp Grounds...");
                    }
                })
            });
        }
    });
    // Add a few comments
}


Finally seedDB():


function seedDB() {

    // Remove camp grounds
    CampGround.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Cleared Camp Grounds...");
            // Add in some camp grounds

            data.forEach(function (seed) {
                CampGround.create(seed, function (err, campground) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Added a Camp Grounds...");
                        // create a comment
                        Comment.create({
                            text: "Awesome place.. But very chilly!!",
                            author: "Mini"
                        }, function (err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save(function (err, data) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log("created new comment");
                                    }
                                });
                            }
                        });
                    }
                });
            });
        }
    });
    // Add a few comments
}


We are removing camp grounds and then creating a CG and adding same comment to each CG
Note the callback nesting

Also we dont have Comments Module defined

This is Error Driven Development!!

We need to add Comments Module now.........

Create models/comments.js

var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    text: String,
    author: String
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

In campgrounds model:

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

Thus we have done the association between CG and comments


A campground collection looks like:

{
        "_id" : ObjectId("58656daf57245a17c8686a50"),
        "name" : "Cloud's Rest",
        "image" : "https://images.pexels.com/photos/128956/pexels-photo-128956.jpeg?h=350&auto=compress&cs=tinysrgb",
        "description" : "Cloudy and smoggy and cold",
        "comments" : [
                ObjectId("58656daf57245a17c8686a53")
        ],
        "__v" : 1
}

_______________________


Nested Routes:

For comments we have routes like:

GET campgrounds/:id/comments/new -> Render form to Create comment
POST campgrounds/:id/comments/new -> Post new comment

User Auth
__________________

Dependencies:
"dependencies": {
    "body-parser": "^1.15.2",
    "ejs": "^2.5.5",
    "express": "^4.14.0",
    "express-session": "^1.14.2",
    "mongoose": "^4.7.6",
    "passport": "^0.3.2",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^4.0.0"
}


Set up a basic app.js server

Then we create a model user

var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

module.exports = mongoose.model("User", UserSchema);


We now add passport to this model


var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

// adds a bunch of methods taht come with passportLocalMongoose and add it to UserSchema

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);


Configurations:

app.use(expressSession({
    secret: "little mini is very busy",
    resave: false,
    saveUninitialized: false
}));

// tell express to use passport

app.use(passport.initialize());
app.use(passport.session());


// These 2 methods are very important
// serialize: encoding data and putting it back in the session
// deserialize: taking data from session and decoding it

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



User.deserializeUser() : does User have this method??

Note: in user.js we had UserSchema.plugin(passportLocalMongoose);

So these methods are added here

app.post("/register", function (req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
        if(err){
            console.log(err);
            return res.render("register");
        }

        console.log(user);
        passport.authenticate("local")(req, res, function () {
            res.redirect("/secret");
        });
    });
});


User.register() add user ti our db.. passwords are stored in salt and hash format


// handling user login

app.get("/login", function (req, res) {
    res.render("login");
});

// Middleware

app.post("/login", passport.authenticate('local', {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function (req, res) {});


Creating a middleware:

function isLoggedIn(req, res, next) {
    // next: next thing that needs to be called
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

Apply this middleware in the secret route:

app.get("/secret", isLoggedIn, function (req, res) {
    res.render("secret");
});

How does this work?

when we issue a GET req to /secret. isLoggedIn() runs
If user is authenticated next() runs
here next refers to the code just after the middleware where it is applied i.e

function (req, res) {
    res.render("secret");
}

if user is NOT authenticated we redirect them and dont call next() this time

________________________


Adding auth to yelp_camp app
Note: passport-local-mongoose takes care of duplicate username for us

Allow user to post comments only when logged in
______________________________________________

// middleware

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
}


Applying this middleware:

app.get("/campgrounds/:id/comments/new", isLoggedIn, function (req, res) {
    CampGround.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});


Now we want to make nav bar more functional
________________________________________________

ie when user is logged in we want to show only log out link etc
How to do this?

the user info is present in req.user

The user data is present in this after we log in
{ _id: 586eaf7c994172286bd3c268,
  username: 'shaunak1105',
  __v: 0 }

This is done by passport

If we dont log in req.user will be undefined

so we can use this logic to adjust the nav bar accordingly

app.get("/campgrounds", function (req, res) {
    // res.render("campgrounds", {campgrounds: campgrounds});

    // user info
    console.log(req.user);
    CampGround.find({}, function (err, campgrounds) {
        if (err) {
            console.log("Error...", err)
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds, currentUser: req.user});
        }
    })
});



app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

We use this middleware to add data to routes


To associate comments with the users
____________________________________________

In our comments model we have:

var commentSchema = mongoose.Schema({
    text: String,
    author: String
});

in author we cant simply store entire user data bcoz user data contains salt and hash also

var commentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});


Only a user who submitted the campground can delete/edit that campground
_________________________________________________________________________

this is known as Authorization

Authentication: figuring out if someone is who they say they are
Authorization: once u know who someone is u figure out what they are allowed to do
ie their permissions

router.get("/campgrounds/:id/edit", function (req, res) {

    // is user logged in

    if (req.isAuthenticated()) {

        CampGround.findById(req.params.id, function (err, foundCampGround) {
            if (err) {
                res.redirect("/campgrounds");
            } else {
                // does user own the campground??
                // NOTE: foundCampGround.author.id is Object and req.user._id is a String
                // So solution is to use method equals() on the Object

                if (foundCampGround.author.id.equals(req.user._id)) {
                    // all ok
                    res.render("campgrounds/edit", {campground: foundCampGround});
                } else {
                    res.send("You do not have permission to do that!");
                }
            }
        });
    } else {
        console.log("You need to be logged in");
        res.send("You need to be logged in");
    }
});


We want to use this code on many routes
So we will make it into a middleware

res.redirect("back") : takes user to prev page they were on


Middleware:

function checkCampgroundOwnership(req, res, next) {
    // is user logged in

    if (req.isAuthenticated()) {

        CampGround.findById(req.params.id, function (err, foundCampGround) {
            if (err) {
                res.redirect("back");
            } else {
                // does user own the campground??
                // NOTE: foundCampGround.author.id is Object and req.user._id is a String
                // So solution is to use method equals() on the Object

                if (foundCampGround.author.id.equals(req.user._id)) {
                    // all ok
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

Showing and hiding edit and delete buttons:

<% if(currentUser && campground.author.id.equals(currentUser._id)) { %>
    <a href="/campgrounds/<%= campground._id %>/edit" class="btn btn-warning">Edit</a>
    <form id="delete-form" action="/campgrounds/<%= campground._id %>?_method=DELETE" method="post">
        <button class="btn btn-danger">Delete</button>
    </form>
<% } %>

currentUser is defined in app2.js

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

Now we want to add functionality to edit and delete the comments:
_____________________________________________________________________

the route will be : /campgrounds/:id/comments/comment_id/edit

Go to comments.js

// EDIT

router.get("/campgrounds/:id/comments/:comment_id/edit", function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

// UPDATE

router.put("/campgrounds/:id/comments/:comment_id", function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

Deleting Comments:



































































































