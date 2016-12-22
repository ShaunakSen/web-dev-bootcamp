var express = require("express");
var app = express();
var request = require("request");
var uri = "https://www.omdbapi.com/?s=";
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("search");
})

app.get("/results", function(req, res){
    // res.send("hi..."); 
    
    // trigger api call
    var searchQuery = req.query.search;
    
    request(uri + searchQuery, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
    })
    
});


app.listen(3000, function(){
    console.log("Movie App has started...");
})