import express from 'express';
import Users from './models/Users';
const SuperUser = require('./models/SuperUser');
const OTPgen = require('./util/OTPgen');
const sendSMS = require('./util/sendSms');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const sendMail = require('./util/sendmail');
const Otp = require('./models/OTP');
const app = express();
require('./config/db');

// mongoose.connect(keys.mongoURI, {useNewUrlParser:true} )
//     .then(()=>console.log('db conneceted...'))
//     .catch(err=>console.log(err))




// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})




// Add POST - /api/login -1
router.post('/login', async (req, res) => {
  console.log('login request');

  const {
    name,
    pwd
  } = req.body;
  SuperUser.findOne({
    email: name
  }, async (err, data) => {
    if (err) throw err;
    console.log(data);
    if (data === {} || data === null) {
      res.status(401).json({
        message: 'User Not Found'
      });
    } else if (data !== {}) {
      bcrypt.compare(pwd, data.pwd, (err, ispwd) => {
        if (err) throw err;
        if (ispwd) {
          const OTP = OTPgen();
          console.log(OTP);
          let msg = `<p> yout OTP: <b>${OTP}</b><br/> if you are not the one trying to login then please ignore it.</p>`;
          sendMail(data.email, 'login OTP', msg);
          let ref = data._id;
          Otp.deleteMany({refer: ref},(err)=>{if(err){console.log(err)}else{
            Otp.insertMany({
              refer: ref,
              otp: OTP
            });
            setTimeout(() => {
              Otp.findOneAndDelete({
                refer: ref
              }, (err) => {
                if (err) throw err;
                console.log('OTP expired...');
              });
            }, 120000);
            res.send(200);
          }});
        } else {
          res.status(401).json({
            message: 'Password dosent match'
          })
        }
      });
    } else {
      res.status(401).json({
        message: 'Bad credentials'
      })
    }
  });



})

// login -2
router.post('/login/otp', async (req, res) => {
  console.log("otp verify");

  const {
    name,
    pwd,
    otp
  } = req.body;
  SuperUser.findOne({
    email: name
  }, async (err, data) => {
    if (err) throw err;
    console.log(data);
    if (data == {}) {
      res.status(401).json({
        message: 'User Not Found'
      });
    } else if (data !== {}) {
      bcrypt.compare(pwd, data.pwd, (err, ispwd) => {
        if (err) throw err;
        if (ispwd) {
          Otp.findOne({ refer: data._id},(err,key)=>{
            if (err) throw err;
            if (key.otp == otp) {
              req.session.authUser = {
                name: `${data.fname} ${data.lname}`,
                level: data.level
              }
              return res.json({
                name: `${data.fname} ${data.lname}`,
                level: data.level
              })
            } else {
              res.status(401).json({
                message: 'otp expired / didint match'
              })
            }
          })
        } else {
          res.status(401).json({
            message: 'Password dosent match'
          })
        }
      });
    } else {
      res.status(401).json({
        message: 'Bad credentials'
      })
    }
  });

})


router.post('/signup', async (req, res) => {
  const {
    fname,
    lname,
    email,
    phone,
    level,
    pwd
  } = req.body;
  SuperUser.find({
    email: email
  }, (err, data) => {
    if (err) throw err;
    if (data.length > 0) {
      res.status(406).json({
        msg: 'user exist'
      })
    } else {
      bcrypt.hash(pwd, saltRounds, function (err, hash) {
        if (err) throw err;
        let newUser = new SuperUser();
        newUser.fname = fname,
          newUser.lname = lname,
          newUser.email = email,
          newUser.phone = phone,
          newUser.level = level,
          newUser.pwd = hash;
        console.log(newUser);
        newUser.save((err) => {
          if (err) throw err;
          res.status(201);
        });
      });
    }
  })
});

// app.use('/schools',require('./schools'));



// Add POST - /api/logout
router.post('/logout', async (req, res) => {
  delete req.session.authUser
  await res.json({
    ok: true
  })
})


// Export the server middleware
export default {
  path: '/api',
  handler: router
}
