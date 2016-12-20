var express = require("express");
var app = express();

// "/" => Hi

app.get("/", function(req, res) {
    res.send("Hi There!!");
});

// "/bye" => Goodbye

app.get("/bye", function(req, res) {
    res.send("Goodbye!!");
});

// animal sounds route

app.get("/speak/:animal", function(req, res) {
    var sounds = {
        pig: "Oink",
        dog: "Woof",
        fish: "..."
    };
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    res.send("The " + animal + " says " + sound);
});

// hello repeat route

app.get("/hello/:number", function(req, res) {
    var number = req.params.number;
    var stringToSend = "";
    for (var i = 0; i < number; ++i) {
        stringToSend += "hello ";
    }
    res.send(stringToSend);
});


app.get("*", function(req, res) {
    res.send("oops.. sorry");
});

// Start the server

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started...");
});
