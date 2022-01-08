var mongoose = require("mongoose");


var gameDataSchema = new mongoose.Schema({
    ballLane: {type: String,required: true},
    catchOrNot: {type:String, required: true},
    userEmail: {type:String, required: true},
    gameDate: {type: Date, required: true},
    gameDateString: {type:String, required: true}
});

var gameData = mongoose.model('gameData', gameDataSchema);
module.exports = gameData;