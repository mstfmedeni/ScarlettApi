'use strict';

let Category = require('../models/category');

let categoryRepo = function(db){
  this.db = db;
};
categoryRepo.prototype = {

  insertCategory: function(e, cb, errCb){
    let db = this.db;
    let data = {kod: e.kod, shortName: e.shortName, name: e.name};
    let query = 'INSERT INTO kategoriler SET ?';
    db.query(query, data, (err, result) => {
      if(err){
        errCb(err);
        return;
      }
      
      cb(result);
    });
  },
  update: function(e, cb, errCb){
    let db = this.db;
    let data = [e.name, e.job, e.salary, e.code];
    let query = 'UPDATE employee SET name = ?, job = ?, salary = ? WHERE code = ?';
    db.query(query, data, (err, result) => {
      if(err){
        errCb(err);
        return;
      }
      cb(result);
    });
  },
  delete: function(id,user, cb, errCb){
    let db = this.db;
    let query = 'update users set active=1 , updateUser=? WHERE id =?';
    db.query(query, [user.id,id], (err, result) => {
      if(err){
        errCb(err);
        return;
      }
      cb(result);
    });
  },
  findOne: function(code, cb, errCb){
    let db = this.db;
    let query = 'select * from users where active=0 and email=? ';
    db.query(query, [code], (err, results, fields) => {
      if(err){
         errCb(err);
         return;
      }
       let result = results[0];
       if(!result){
        cb(null)
         
      } else {
        let Category = new Category(data.id,data.kod,data.shortName,data.name,data.aciklama,data.createdUser,data.updateUser,data.createdDate,data.updateDate);
        cb(user);
       }
    });
  },
  findAll: function(cb, errCb){
    let db = this.db;
    let query = 'SELECT users.ulke as uid,users.sehir as sid,users.resim,users.cep2,users.id,users.name,users.shortName,users.shortKod,users.email,users.yetkili,users.telefon,users.cep,users.adres,ulkeler.adi as ulke,iller.adi as sehir,role.adi as role,users.createdDate,users.createdUser,users.updateDate,users.updateUser,users.role as roleID FROM users,ulkeler,iller,role WHERE users.ulke=ulkeler.id and users.sehir=iller.id and users.role=role.id and users.active=0';
    db.query(query, (err, results, fields) => {
      if(err){
        errCb(err);
        return;
      }else{
        let users = [];
        for(let i=0;i<results.length;i++){
          let e = results[i];
          let Category = new Category(data.id,data.kod,data.shortName,data.name,data.aciklama,data.createdUser,data.updateUser,data.createdDate,data.updateDate);
          users.push(user);
        }
        cb(users);
      }
     
    });
  }

};

module.exports = categoryRepo;

 