const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const config = require('./config/database');
const users = require('./routes/users');

// Connect to db

mongoose.connect(config.database);

mongoose.connection.on('connected', function () {
    console.log("Connected to database " + config.database);
});

mongoose.connection.on('error', function (err) {
    console.log("database error: " + err);
});


const app = express();

const port = 3000;

// Middle wares

app.use(cors());
app.use(bodyParser.json());

// Set static folder

app.use(express.static(path.join(__dirname, 'public')));

// Routes

// mounting the routes
app.use('/users', users);

app.get("/", function (req, res) {
    res.send("Hi There!!");
});


// Start server

app.listen(port, function () {
    console.log("Server running on port: " + port);
});