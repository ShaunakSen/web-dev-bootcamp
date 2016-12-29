var mongoose = require('mongoose');

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});


var CampGround = mongoose.model("Campground", campgroundSchema);

module.exports = CampGround;