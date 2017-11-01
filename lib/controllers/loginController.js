'use strict';

let db = require('../config/mysqlConfig');
let userRepo = require('../repositories/userRepo');
let User = require('../models/user');
let helper = require('../helpers');
let jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');


let login = (req, res) => {
    
  if(!(req.body.userEmail) || !(req.body.userPassword)){
    console.log(req.originalUrl+' logine girdi')
    res.status(501).json(helper.getError(501,'Lütfen Gerekli Alanları Doldurunuz.'));
    return;
   }
   let userRepos = new userRepo(db);   
  let code = req.body.userEmail;
   userRepos.findOne(code, result => {
     if(result){
       if(helper.comparePass(req.body.userPassword,result.password)){
        var user = {
          id:result.id, name:result.name, shortName:result.shortName, shortKod:result.shortKod, email:result.email, password:req.body.userPassword, role:result.role, createdUser:result.createdUser, updateUser:result.updateUser
        }
        var token = jwt.sign(user,process.env.SECRET_KEY,{
          expiresIn: '100 days' 
        })
       res.status(200).json({auth_key:token,success:true, user: user});
       }else{
        res.status(403).json(helper.getError(403,code+' Bilgileri yanlış Lütfen Tekrar Deneyiniz.'));
       }
     }else{
      res.status(404).json(helper.getError(404,code+' Kullanıcısı Bulunamadı.')); 
     }
  
  }, err => {
    if(err){
      res.status(500).json(helper.getError(500,' Bir Hata Oluştu Lütfen Terkar Deneyiniz'));      
      console.log(err);
    }
  });
};

module.exports = {
  login: login
 };
