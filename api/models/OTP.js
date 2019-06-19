const mongoose = require('mongoose');

const OTPSchema = mongoose.Schema({
    refer: {
        type: String,
        require: true,
    },
    otp: {
        type: String,
        require: true,
    }
})


const Otp = module.exports = mongoose.model('Otp',OTPSchema);