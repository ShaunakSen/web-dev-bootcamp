var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/blog_demo_2");

var postModel = require('./models/posts');
var User = require('./models/user');




 /*User.create({
 email: "mini@blaah.com",
 name: "Little mini"
 });

postModel.create({
 title: "sleepy",
 content: "feeling sleepy"
 }, function (err, post) {
 console.log(post);
 });*/

// Connect post and user using id

/*postModel.create({
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
});*/

// Add another post

/*postModel.create({
    title: "hungry again pt 2 !!",
    content: "feeling hungry again.."
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
});*/

// Find user and find all posts by that user
// populate("posts") populates the field posts by object ids


User.findOne({email: "mini@blaah.com"}).populate("posts").exec(function (err, user) {
    if(err){
        console.log(err)
    }else {
        console.log(user);
    }
});



