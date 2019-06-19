const express = require('express');
const app = express();
const router = express.Router();
const Student = require('./../models/Student');
const School = require('./../models/Schools');
const Payment = require('./../models/Payments');
const sendEmail = require('./../util/sendmail');
const sendSms = require('./../util/sendSms');
const OTPgen = require('./../util/OTPgen');
const OTPModel = require('./../models/OTP');

// find and send student and school fees
const school = async (name,id,res) => {
    await Student.findOne({school: name,studentId:id},async (err,data)=>{
        if (err) throw err;
        if (data !== null || data !== {}) {
            await School.findOne({name:name},(err,sc)=>{
                if(err) throw err;
                const schoolFees = sc.classes.filter((item) => item.std == data.std );
                res.send({data,schoolFees});
            })
        } else {
            res.send(404);
        }
    });
}



router.post('/',async (req,res)=>{
    try{
        const { forWhich, companyName, key } = req.body;
        switch (forWhich) {
            case "school":
                await school(companyName,key,res);
            break;
            default:
                res.status(404);
            break;
        }
    } catch(err){
        console.log(err);
    }
})



// create a payment attempt collections
const CommitAttempt = async (key,terms,termCost,taxCut,cummision) => {
    await Payment.insertMany({key,terms,termCost,taxCut,cummision},async (err)=>{
        try {
            console.log("attempt commited");
        } catch {
            console.log(err);
        }
    });
}

// on progress
router.post('/attempt',async (req,res)=>{
    try {
        const OTP = OTPgen();
        const msg = `${OTP} is your online payment OTP`;
        const { sID,OtpMethod,email,phone,key,terms,termCost,taxCut,cummision } = req.body;
        let ourOTP = OTP + sID.slice(18);
        console.log("meta is ",ourOTP);
        
        CommitAttempt(key,terms,termCost,taxCut,cummision);
        OTPModel.insertMany({refer:key,otp:ourOTP}, () => {
            try{
                res.sendStatus(200);
            } catch(error) {
                console.log(error);
            }
        });
        switch (OtpMethod) {
            case "SMS":
                sendSms('arunberry47@gmail.com',phone,msg)
                console.log('success');
                break;
            case "EMAIL":
                sendEmail(email,"OTP",`<p><b>${OTP}</b> is your online payment OTP</p>`)
                console.log('success');
                break;
            case "BOTH":
                sendSms('arunberry47@gmail.com',phone,msg);
                sendEmail(email,"OTP",`<p><b>${OTP}</b> is your online payment OTP</p>`);
                console.log('success');
                break;
            default:
                sendEmail(email,"OTP",`<p><b>${OTP}</b> is your online payment OTP</p>`);
                console.log('success');
                break;
        }
    } catch(err) {
        console.log(err);
    }
});

router.post('/verifyOTP',async (req,res) => {
    try {
        const { OTP,id } = req.body;
        let savedOTP = OTP + id.slice(18);
        console.log(savedOTP);
        
        await OTPModel.findOne({otp:savedOTP},async (err,OtpKey) => {
            try {
                await Student.findOne({_id: OtpKey.refer}, async (err, stud) => {
                    try{
                        if (stud !== null) {
                            if (stud._id == id) {
                                res.sendStatus(200);
                                OTPModel.findOneAndDelete({otp:savedOTP},async (err) => {
                                    if(err) throw err;
                                })
                            }else {
                                res.sendStatus(404);
                            }
                        } else {
                            res.sendStatus(404);
                        }
                    } catch {
                        console.log(err);
                    }
                })
            } catch {
                if (err == null) {
                    res.sendStatus(404);
                }
                console.log(err);
            }
        } )
    } catch(err) {
        console.log(err);
    }
})

// Export the server middleware
export default {
  path: '/api/payment',
  handler: router
}
