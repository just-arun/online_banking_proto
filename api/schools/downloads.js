const express = require('express');
const app = express();
const router = express.Router();
var json2xls = require('json2xls');
var fs = require('fs');
const Student = require('./../models/Student');
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost/test',['students']);


app.use(json2xls.middleware);

router.post('/:forwhich', async (req,res)=>{
    const downloadFor = req.params.forwhich;
    try {
        switch (downloadFor) {
            case "student":
                await db.students.find({},(err,data)=>{
                    if(err) throw err;
                    console.log(data);
                    var xls = json2xls(data);
                    fs.writeFileSync(`${__dirname}/students.xlsx`, xls, 'binary');
                    res.send(200);
                })
                break;
        
            default:
                break;
        }
    } catch(err) {
        console.log(err);
    }
});


var deleteFolderRecursive = function(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file) {
          var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
      }
};

router.get('/get/:forwhich', async (req,res)=>{
    const downloadFor = req.params.forwhich;
    try{
        switch (downloadFor) {
            case "student":
                var file = `${__dirname}/students.xlsx`;
                if(!fs.existsSync(file)) {
                    res.sendStatus(404);
                } else {
                    res.download(file);
                    setTimeout(() => {
                        deleteFolderRecursive('./students.xlsx');
                    }, 5000);
                }
                break;
        
            default:
                break;
        }
    } catch(err) {
        console.log(err);
    }
});



// Export the server middleware
export default {
    path: '/api/schools/downloads',
    handler: router
}
  