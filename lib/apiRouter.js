'use strict';

let express = require('express');
var router = express.Router();
let helper = require('./helpers');
let jwt = require('jsonwebtoken');


 
// AOUTH  midilware

 
router.use(function(req,res,next){
  console.log('Time: ', Date.now());
  console.log('middillede');
   
   if(req.originalUrl==='/login'&&req.method==='POST'){
      let userController = require('./controllers/loginController');    
    router.use(userController.login);
    next();
 }else{
    var token = req.body.auth_key || req.headers['auth_key'];
    if (token){
      
       jwt.verify(token,process.env.SECRET_KEY,function(err,decode){
        if(err){
          res.status(401).json(helper.getError(401,'Doğrulama Hatalı Lütfen Tekrar Deneyiniz'));        
          next();  
           
         }else{
           var uses = decode;
           console.log(decode)
           process.env.userEmail = decode.email;
           process.env.userID = decode.id;
           // console.log(decode);
           next();
        }
      })
    }else{
      res.status(401).json(helper.getError(401,'Doğrulama Eksik Lütfen Tekrar Deneyiniz'));
      return;
     }
  }
})
/*
router.post('/login/',function(req,res,next ){
  userController.login(req,res,next);
  next();    
})*/
//router.post('/login',userController.login);


let userRoute = require('./routers/userRoute');


// USERS
router.use('/users',userRoute);


module.exports = router;