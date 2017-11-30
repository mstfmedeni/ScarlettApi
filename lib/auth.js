'use strict';

    let express = require('express');
    var router = express.Router();
    let helper = require('./helpers');
    let jwt = require('jsonwebtoken');
    
    router.use(function(req,res,next){
     var token = req.headers['auth_key'];
    
    if (typeof token !== 'undefined' && token) {
        jwt.verify(token, process.env.SECRET_KEY, function (err, decode) {
            if (err) {
                res.status(401).json(helper.getError(401, 'Doğrulama Hatalı Lütfen Tekrar Deneyiniz'));
                return;
    
            } else {
                var uses = decode;
                console.log(decode);
                process.env.userEmail = decode.email;
                process.env.userID = decode.id;
                next();
             }
        })
    }
    else {
        res.status(401).json(helper.getError(401, 'Doğrulama Eksik Lütfen Tekrar Deneyiniz'));
        return;
    }

});

module.exports = router;