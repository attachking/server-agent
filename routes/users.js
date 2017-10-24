let express = require('express');
let router = express.Router();
let axios = require('axios');

/* GET users listing. */
router.post('/agent', function (req, res, next) {
    try{
        let body = req.body;
        axios.get(body.url || '/', {
            headers: {
                'referer': body.referer,
                'host': body.host
            },
            params: body
        }).then(data => {
            res.send(data.data);
        }).catch(err => {
            next(err);
        });
    }catch(err){
        next(err);
    }
});

module.exports = router;