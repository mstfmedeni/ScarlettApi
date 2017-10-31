'use strict';

let db = require('../config/mysqlConfig');
let userRepo = require('../repositories/userRepo');
let User = require('../models/user');
let helper = require('../helpers');
let jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

let userRepos = new userRepo(db);
/*
let login2 = (req, res,next) => {
  var user = {
    username: 'test',
    email: 'test@test.com'
  }
  var token = jwt.sign(user,process.env.SECRET_KEY,{
    expiresIn: 4000 
  });
  
     res.status(200).json({success: "Giriş Başarılı", auth_key: token, sifre:helper.getPass("1234"),sonuc:helper.comparePass("1234","$2a$10$2Zk7duUy9vOhX14wRBDcXeBi5oPvfs8MucjHnvPIFYW12OxhHUBEq")});   
    next();  
     //res.status(200).json({success: "Giriş Başarılı", auth_key: token, sifre:sifree});
};*/
let login = (req, res, next) => {
    
  if(!(req.body.userEmail) || !(req.body.userPassword)){
    res.status(550).json(helper.getError(550,'Lütfen Gerekli Alanları Doldurunuz.'));
    return;
  }
  let code = req.body.userEmail;
   userRepos.findOne(code, result => {
     if(result){
       if(helper.comparePass(req.body.userPassword,result.password)){
        var user = {
          id:result.id, name:result.name, shortName:result.shortName, shortKod:result.shortKod, email:result.email, password:req.body.userPassword, role:result.role, createdUser:result.createdUser, updateUser:result.updateUser
        }
        var token = jwt.sign(user,process.env.SECRET_KEY,{
          expiresIn: 4000 
        })
       res.status(200).json({auth_key:token,success:true, user: user});
       return;
       }else{
        res.status(403).json(helper.getError(403,code+' Bilgileri yanlış Lütfen Tekrar Deneyiniz.'));
        next();        
       }
     }else{
      res.status(403).json(helper.getError(403,code+' Kullanıcısı Bulunamadı.'));
      next();             
      
     }
  
  }, err => {
    if(err){
      res.status(403).json(helper.getError(403,code+' Bir Hata Oluştu Lütfen Terkar Deneyiniz'));      
      console.log(err);
      next(err);
    }
  });
};

module.exports = {
  login: login
 };
