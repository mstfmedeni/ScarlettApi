'use strict';

let db = require('../config/mysqlConfig');
let userRepo = require('../repositories/userRepo');
let User = require('../models/user');
let helper = require('../helpers');
let async = require('async');

let deleteUser = (req, res, next) => {
  if(!req.params.id){
    res.status(400).json(helper.getError(400,'Lütfen Gerekli Alanları Doldurunuz.'));
    return;
 }
  let code = req.params.id;
   let userRepos = new userRepo(db);  
   let use = helper.getLoginUser(req,result => {
     userRepos.delete(code, result ,result => {
      res.status(200).json({success:true, result: result});
      next();
    }, err => {
      if(err){
        res.status(500).json(helper.getError(500,'Bir Hata Oluştu Lütfen tekrar deneyiniz.',err));
         next(err);
      }
    });

  },err =>{
    res.status(500).json(helper.getError(500,'Bir Hata Oluştu Lütfen tekrar deneyiniz.',err));
  });

};

let getUsers = (req, res,next) => {
  let userRepos = new userRepo(db);  
  userRepos.findAll(result => {
    res.status(200).json({success:true,users: result});
    next();
   }, err => {
    if(err){
      res.status(500).json(helper.getError(500,'Bir Hata Oluştu lütfen tekrar deneyiniz.',err));
      console.error(err);      
      next(err);      
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
      res.status(403).json(helper.getError(403,code+'Kullanıcısı Bulunamadı.',err));
      console.error(err);      
      next(err);      
     }
  
  }, err => {
    if(err){
      res.status(500).json(helper.getError(500,'Bir Hata Oluştu lütfen tekrar deneyiniz.',err));    
      console.error(err);            
      next(err);
    }
  });
};


module.exports = {
  getUsers: getUsers,
  getUserWithEmail: getUserWithEmail,
  deleteUser: deleteUser
  
};
