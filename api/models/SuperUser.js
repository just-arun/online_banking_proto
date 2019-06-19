import mongoose from 'mongoose'


const SuperUserSchema = mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    phone: Number,
    pwd: String,
    level: String
});

const SuperUser = module.exports = mongoose.model('SuperUser',SuperUserSchema);

