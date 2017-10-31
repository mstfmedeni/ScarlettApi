'use strict';

let db = require('../config/mysqlConfig');
let userRepo = require('../repositories/userRepo');
let User = require('../models/user');
let helper = require('../helpers');


let getUsers = (req, res,next) => {
  let userRepos = new userRepo(db);  
  userRepos.findAll(result => {
    res.status(200).json({success:true,users: result});
    next();
    return;
  }, err => {
    if(err){
      console.error(err);      
      res.status(500).json(helper.getError(500,'Bir Hata Oluştu lütfen tekrar deneyiniz.'));
    }
  });
};
let getUserWithEmail = (req, res, next) => {
  if(!req.body.email){
    res.status(400).json(helper.getError(400,'Lütfen Gerekli Alanları Doldurunuz.'));
    return;
  }
  let userRepos = new userRepo(db);  
  let code = req.body.email;
   userRepos.findOne(code, result => {
     if(result){
       res.status(200).json({message: 'get employee', user: result});
      next();
     }else{
      res.status(403).json(helper.getError(403,code+'Kullanıcısı Bulunamadı.'));
      
     }
  
  }, err => {
    if(err){
      next(err);
    }
  });
};


module.exports = {
  getUsers: getUsers,
  getUserWithEmail: getUserWithEmail
};
