var express = require('express');
var router = express.Router();
let http = require('http');
let qs = require('querystring');

/* GET users listing. */
router.post('/agent', function (req, res, next) {
    try{
        let body = req.body;
        let postData = qs.stringify(body.data);
        let request = http.request({
            host: body.host,
            method: body.method || 'get',
            path: body.path,
            headers: body.header
        }, response => {
            let str = '';
            response.setEncoding('utf-8');
            response.on('data', (chunk) => {
                str += chunk;
            });
            response.on('end', () => {
                res.send(str);
            });
        });
        request.write(postData);
        request.end();
        request.on('error', err => {
            next(err);
        });
    }catch(err){
        next(err);
    }
});

module.exports = router;