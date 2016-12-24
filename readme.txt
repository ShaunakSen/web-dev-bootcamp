By default express does not serve any file at all except the views directory

We need to tell express explicitly to serve directory

There is a diff bw /app.css and app.css

/app.css : look not in same directory but in root directory


YelpCamp
________________

Mongo Commands:

use demo
db.dogs.insert({name:"Rusty", breed: "Mutt"})
show collections
dogs
 db.dogs.find()
{ "_id" : ObjectId("585bf4bb753d9d94fc519773"), "name" : "Rusty", "breed" : "Mutt" }
db.dogs.find({name:"Rusty"})
{ "_id" : ObjectId("585bf4bb753d9d94fc519773"), "name" : "Rusty", "breed" : "Mutt" }
db.dogs.update({name: "Lulu"}, {breed: "Labradoodle"})
-- completely overwrites
db.dogs.find()
{ "_id" : ObjectId("585bf4bb753d9d94fc519773"), "name" : "Rusty", "breed" : "Mutt" }
{ "_id" : ObjectId("585bf520753d9d94fc519774"), "name" : "Lucy", "breed" : "Mutt" }
{ "_id" : ObjectId("585bf578753d9d94fc519775"), "breed" : "Labradoodle" } --> overwritten


If we dont want it to be overwritten:
db.dogs.update({name: "Rusty"},{$set:{name:"Tater", isCute: true}})
db.dogs.remove({breed: "Labradoodle"})->remove


Mongoose:

Mongoose is a package which helps us interact with mongodb inside js files.
it is basically a js layer on top of mongodb


In Databases/cats.js

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/cat_app");

cat_app is the name of the db
If it is not there it will get created

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});


This is just a nice way of providing structure
But it DOES NOT mean that we cant add new stuff or leave certain things off

// takes the cat schema and compiles it into a model and stores in var Cat

var Cat = mongoose.model("Cat", catSchema);



RESTful Routes
___________________

INDEX Route:    /dogs           GET     Display a list of all dogs
NEW Route:      /dogs/new       GET     Displays form to make a new dog
CREATE Route:   /dogs           POST    Add new dog to db
SHOW            /dogs/:id       GET     Shows info about one dog
EDIT            /dogs/:id/edit  GET     Show edit form for one dog
UPDATE          /dogs/:id       PUT     Update a particular dog; then redirect
DESTROY         /dogs/:id       DELETE  Delete a particular dog; then redirect

REST - a mapping bw HTTP routes and CRUD

Its a pattern of defining our routes

Blog - our entity











