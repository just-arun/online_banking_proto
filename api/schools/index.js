const express = require('express');
const app = express();
const router = express.Router();
const Schools = require('./../models/Schools');
// router.use((req, res, next) => {
//   Object.setPrototypeOf(req, app.request)
//   Object.setPrototypeOf(res, app.response)
//   req.res = res
//   res.req = req
//   next()
// })


router.get('/all', (req, res) => {
  Schools.find({},(err,data)=>{
    if (err) throw err;
    res.send(data);
  });
});

// Export the server middleware
export default {
  path: '/api/schools',
  handler: router
}
