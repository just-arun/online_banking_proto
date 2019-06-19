const express = require('express');
const app = express();
const router = express.Router();
const Student = require('./../models/Student');
const RandGen = require('./../util/OTPgen');


router.get('/all', (req, res) => {
  Student.find({}, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});


router.put('/update/:_id', (req, res) => {

  const {
    fees,
    name,
    std,
    sec,
    school,
    number,
    city,
    fatherName,
    studentId,
    bloodgroup
  } = req.body;
  const id = req.params._id;
  const stud = {
    fees,
    name,
    std,
    sec,
    school,
    number,
    city,
    fatherName,
    studentId,
    bloodgroup,
    edit: false,
    show: false
  };

  console.log(req.body);



  Student.updateOne({
    _id: id
  }, stud, (err) => {
    if (err) throw err;
    res.status(200);
  });
})


// add student
router.post('/add', async (req, res) => {
  const {
    name,
    std,
    sec,
    school,
    number,
    fatherName,
    studentId,
    bloodgroup,
    fine,
    email,
    age
  } = req.body.person;
  const ourID = RandGen();
  try {
    await Student.insertMany({
      name,
      std,
      sec,
      school,
      number,
      fatherName,
      studentId: ourID,
      bloodgroup,
      fine:0,
      email,
      age,
      edit: false,
      show: false
    }, async (err) => {
      if (err) throw err;
      res.send(200);
    })
  } catch(err) {
    console.log(err);
  }
});

// delete student

router.delete('/delete/:id', async (req,res)=>{
  const id = req.params.id;
  try {
    Student.findByIdAndRemove({_id:id},(err)=>{
      if (err) throw err;
      res.send(200);
    });
  } catch(err) {
    console.log(err);
  }
});


// Export the server middleware
export default {
  path: '/api/schools/students',
  handler: router
}
