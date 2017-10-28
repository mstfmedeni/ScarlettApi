'use strict';

let USER = require('../models/user');

let userRepo = function(db){
  this.db = db;
};

userRepo.prototype = {

  findAll: function(cb, errCb){
    let db = this.db;
    let query = 'SELECT * FROM userss';
    db.query(query, (err, results, fields) => {
      if(err){
        errCb(err);
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
