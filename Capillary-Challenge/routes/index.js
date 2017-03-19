var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Games = require('../models/games')


router.use(bodyParser.json());

router.get("/", function (req, res) {
    res.send("Hello World!!")
});

router.get("/api/games", function (req, res) {
    Games.find({}, function (err, foundGames) {
        if(err){
            console.log(err);
        } else {
            res.json(foundGames);
        }
    })
});


router.get("/games", function (req, res) {
    Games.find({}, function (err, foundGames) {
        if(err){
            console.log(err);
        } else {
            res.render("index", {games: foundGames})
        }
    })
});

// TEST ROUTES

router.get("/success", function (req, res) {
    res.send("Success!!");
});

router.get("/failed", function (req, res) {
    res.send("Failure!!");
});




module.exports = router;
