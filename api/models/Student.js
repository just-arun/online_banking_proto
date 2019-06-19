const mongoose = require('mongoose');
const StudentSchema = mongoose.Schema({
    fees: Array,
    name: String,
    std: String,
    sec: String,
    school: String,
    number: Number,
    city: String,
    fatherName: String,
    studentId: String,
    bloodgroup: String,
    email: String,
    fine: Number,
    edit: Boolean,
    show: Boolean
})

const Student = module.exports = mongoose.model('Student',StudentSchema);