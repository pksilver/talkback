const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    password:String,
    mobile:Number,
    username:String
});

module.exports = mongoose.model('User',userSchema);