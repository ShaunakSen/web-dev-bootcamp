var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gamesSchema = new Schema({
    title:{
        type:String
    },
    platform:{
        type:String
    },
    score:{
        type:Number
    },
    genre:{
       type:String
    },
    editors_choice:{
        type:String
    }
});


var Games = mongoose.model('Game', gamesSchema);
module.exports = Games;