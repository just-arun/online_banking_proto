const mongoose = require('mongoose');
const SchoolsSchema = mongoose.Schema({
    name: String,
    started: String,
    address: String,
    classes: Array
});
const Schools = module.exports = mongoose.model('Schools',SchoolsSchema);
