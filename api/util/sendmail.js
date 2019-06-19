var nodemailer = require('nodemailer');
const fs = require('fs');
const keys = require('./../config/keys');



var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: keys.mname,
        pass: keys.mpwd
    }
});


let sendmail = async (to, subject, html) => {
    await transporter.sendMail({
        from:keys.mname,
        to,
        subject,
        html
    }, async (error, info) => {
        try{
            console.log('Email sent: ' + info.response);
        } catch {
            console.log(error);
        }
    });
}

module.exports = sendmail;