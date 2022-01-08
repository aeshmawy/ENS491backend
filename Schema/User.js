var mongoose = require("mongoose");


var userSchema = new mongoose.Schema({
    email: {type: String, unique: true ,required: true},
    password: {type:String, required: true},
    userType: {type: Number, default: 1, enum: [0,1,2]},//1 is Parent 2 is Child and 0 Therapist 
    
    //TODO: Cart and products schema
});

var User = mongoose.model('myuser', userSchema);
module.exports = User;