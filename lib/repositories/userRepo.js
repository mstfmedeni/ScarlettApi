'use strict';

let USER = require('../models/user');

let userRepo = function(db){
  this.db = db;
};

userRepo.prototype = {

  insertUser: function(e, cb, errCb){
    let db = this.db;
    let data = {code: e.code, name: e.name, job: e.job, salary: e.salary};
    let query = 'INSERT INTO employee SET ?';
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
        let user = new USER(result.id, result.name, result.shortName, result.shortKod, result.email, result.password, result.role, result.createdUser, result.updateUser);
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
          let user = new USER(e.id, e.name, e.shortName, e.shortKod, e.email, e.password, e.role, e.createdUser, e.updateUser);
          users.push(user);
        }
        cb(users);
      }
     
    });
  }

};

module.exports = userRepo;
