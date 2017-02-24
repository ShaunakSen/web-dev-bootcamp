const express = require('express');
const router = express.Router();

// Register

router.get('/register', function (req, res, next) {
    res.send("Register")
});

// Authenticate

router.post('/authenticate', function (req, res, next) {
    res.send("Authenticate")
});

// Profile

router.get('/profile', function (req, res, next) {
    res.send("Profile")
});

// Validate

router.get('/validate', function (req, res, next) {
    res.send("Validate")
});

module.exports = router;