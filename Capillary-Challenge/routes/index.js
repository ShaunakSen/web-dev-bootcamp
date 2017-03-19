var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


router.use(bodyParser.json());

router.get("/", function (req, res) {
    res.send("Hello World!!")
});


// TEST ROUTES

router.get("/success", function (req, res) {
    res.send("Success!!");
});

router.get("/failed", function (req, res) {
    res.send("Failure!!");
});




module.exports = router;
