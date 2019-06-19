const express = require('express');
const router = express.Router();
const Student = require('./../models/Student');





// Export the server middleware
export default {
    path: '/api/schools/teachers',
    handler: router
}
  