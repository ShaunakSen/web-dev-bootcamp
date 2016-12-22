var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/cat_app");

// plan for a cat

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

// takes the cat schema and compiles it into a model and stores in var Cat

var Cat = mongoose.model("Cat", catSchema);

// Insert a cat

/*var george = new Cat({
 name: "Mrs Norris",
 age: 7,
 temperament: "evil"
 });

 george.save(function (err, cat) {
 if(err){
 console.log("Something went wrong!!")
 }
 else {
 console.log("Saved the cat:", cat);
 }
 });*/

// retrieve cats

Cat.find({}, function (err, cats) {
    if (err) {
        console.log("Error:", err);
    }
    else {
        console.log("Cats are:...");
        console.log(cats);
    }
});

// quicker way to save a cat


Cat.create({
    name: "Blaah",
    age: 15,
    temperament: "bland"
}, function (err, cat) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(cat);
    }
});






