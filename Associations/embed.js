var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/blog_demo");


// POST MODEL

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var postModel = mongoose.model("Post", postSchema);


// USER MODEL

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);


/*var newUser = new User({
    email: "mini@poochi.com",
    name: "Mini"
});

newUser.posts.push({
    title: "Dresses vs chocolates",
    content: "need both........"
});

newUser.save(function (err, user) {
    if(err){
        console.log(err);
    }
    else {
        console.log(user)
    }
});*/

/*
var newPost = new postModel({
    title: "Django vs Node",
    content: "Try both.. Both are awesome!!"
});

newPost.save(function (err, post) {
    if(err){
        console.log(err);
    }
    else {
        console.log(post)
    }
});
*/

User.findOne({email: "mini@poochi.com"}, function (err, user) {
    if(err){
        console.log(err);
    }
    else {
        // add a new post
        user.posts.push({
            title: "Blue blaah",
            content: "mini is very busy.. blaah"
        });
        user.save(function (err, user) {
            if(err){
                console.log(err);
            }else {
                console.log(user);
            }
        });
    }
});
