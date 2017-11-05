'use strict';

let db = require('../config/mysqlConfig');
let CategoryRepo = require('../repositories/categoryRepo');
let Category = require('../models/category');
let helper = require('../helpers');
let async = require('async');

let insertCategory = (req, res, next) => {
  if(!req.body){
    res.status(400).json(helper.getError(400,'Lütfen Gerekli Alanları Doldurunuz.'));
    next('parameter tidak ada..');
    return;
  }
  let data = req.body;
  let Category = new Category(data.id,data.kod,data.shortName,data.name,data.aciklama,data.createdUser,data.updateUser,data.createdDate,data.updateDate);
  let CategoryRepos = new CategoryRepo(db);  
    CategoryRepos.insertCategory(Category, result => {
      res.status(200).json({success:true, result: result});
      next();
  }, err => {
    if(err){
      res.status(500).json(helper.getError(500,'Bir Hata Oluştu Lütfen tekrar deneyiniz.',err));
      next(err);
    }
  });
};
let updateCategory = (req, res, next) => {
  if(!req.body){
    res.status(400).json(helper.getError(400,'Lütfen Gerekli Alanları Doldurunuz.'));
    next('parameter tidak ada..');
    return;
  }
  if(!req.params.id){
    res.status(400).json(helper.getError(400,'Lütfen Gerekli Alanları Doldurunuz.'));
    next('parameter tidak ada..');
    return;
  }
  let data = req.body;
  let id = req.params.id;
  let Category = new Category(data.id,data.kod,data.shortName,data.name,data.aciklama,data.createdUser,data.updateUser,data.createdDate,data.updateDate);
  let CategoryRepos = new CategoryRepo(db);  
  CategoryRepos.update(Category, result => {
    res.status(200).json({success:true, result: result});
    next();
  }, err => {
    if(err){
      res.status(500).json(helper.getError(500,'Bir Hata Oluştu Lütfen tekrar deneyiniz.',err));
      next(err);
       }
  });
};


let deleteCategory = (req, res, next) => {
  if(!req.params.id){
    res.status(400).json(helper.getError(400,'Lütfen Gerekli Alanları Doldurunuz.'));
    return;
 }
  let code = req.params.id;
   let CategoryRepos = new CategoryRepo(db);  
   let use = helper.getLoginCategory(req,result => {
     CategoryRepos.delete(code, result ,result => {
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

let getCategorys = (req, res,next) => {
  let CategoryRepos = new CategoryRepo(db);  
  CategoryRepos.findAll(result => {
    res.status(200).json({success:true,kategoriler: result});
    next();
   }, err => {
    if(err){
      res.status(500).json(helper.getError(500,'Bir Hata Oluştu lütfen tekrar deneyiniz.',err));
      console.error(err);      
      next(err);      
    }
  });
};
let getCategory = (req, res, next) => {
  if(!req.body.email){
    res.status(400).json(helper.getError(400,'Lütfen Gerekli Alanları Doldurunuz.'));
    return;
  }
  let CategoryRepos = new CategoryRepo(db);  
  let code = req.body.email;
   CategoryRepos.findOne(code, result => {
     if(result){
       res.status(200).json({message: 'get employee', kategoriler: result});
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
  insertUser: insertUser,  
  getCategorys: getCategorys,
  getCategoryWithEmail: getCategoryWithEmail,
  deleteCategory: deleteCategory,
  updateCategory: updateCategory
  
};
