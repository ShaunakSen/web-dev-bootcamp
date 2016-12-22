var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({encoded: true}));

app.use(express.static("public"));

var friends = ["mini", "paddy", "saurav", "bhagu"];

app.get("/", function (req, res) {
    res.render("home.ejs");
});

app.get("/fallinlovewith/:thing", function (req, res) {
    var thing = req.params.thing;
    res.render("love.ejs", {thingVar: thing});
});

app.get("/posts", function (req, res) {
    var posts = [
        {title: "West World", rating: 9},
        {title: "Game Of Thrones", rating: 9.2},
        {title: "F.R.I.E.N.D.S", rating: 10}
    ];
    res.render("posts.ejs", {posts: posts});
});

app.post("/addfriend", function (req, res) {
    var newFriend = req.body.newfriend; //For this we need body-parser
    friends.push(newFriend);
    // res.send("Hi from POST route!!");
    res.redirect("/friends");
});

app.get("/friends", function (req, res) {

    res.render("friends.ejs", {friends: friends});
});

app.listen(3000, function () {
    console.log("Server running...");
});

