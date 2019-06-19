var http = require('http');
var urlencode = require('urlencode');
const keys = require('./../config/keys');


function sendSms(email, number, message) {
    let msg = urlencode(message);
    let sender = 'txtlcl';
    let hash = keys.smsHASH;
    // let data = `username=${email}&hash=${hash}&sender=${sender}&numbers=${number}&message=${msg}`;
    let data = 'username='+email+'&hash='+hash+'&sender='+sender+'&numbers='+number+'&message='+msg
    const options = {
        host: 'api.textlocal.in',
        path: '/send?' + data
    }
    http.request(options, callback).end();
}

function callback(response) {
    var str = '';
    response.on('data', function (chunk) {
        str += chunk;
    });
    response.on('end', function () {
        console.log(str)
    });
}


module.exports = sendSms;