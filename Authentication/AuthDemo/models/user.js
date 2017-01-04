var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

// adds a bunch of methods taht come with passportLocalMongoose and add it to UserSchema

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);


