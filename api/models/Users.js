const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    name: String,
    pwd: String,
    level: String
});



const Users = module.exports = mongoose.model('Users', UserSchema);