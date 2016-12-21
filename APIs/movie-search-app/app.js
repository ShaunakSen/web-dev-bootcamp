var express = require("express");
var app = express();
var request = require("request");
var uri = "https://www.omdbapi.com/?s=harry";
app.set("view engine", "ejs");

app.get("/results", function(req, res){
    // res.send("hi..."); 
    
    // trigger api call
    
    request(uri, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
    })
    
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie App has started...");
})