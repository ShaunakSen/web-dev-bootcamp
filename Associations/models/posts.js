var mongoose = require('mongoose');

// POST MODEL

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var postModel = mongoose.model("Post", postSchema);

// This is like a return value

module.exports = postModel;
