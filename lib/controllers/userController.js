'use strict';

let db = require('../config/mysqlConfig');
let userRepo = require('../repositories/userRepo');
let User = require('../models/user');
let helper = require('../helpers');

let getUsers = (req, res,next) => {
  let userRepos = new userRepo(db);
  userRepos.findAll(result => {
    console.log(helper.getPage(2));
    res.status(200).json({message: 'get all Users', data: result});
    next();
  }, err => {
    if(err){
      //console.error(err);      
      res.status(400).json(helper.getError(400,'HATA Değil geldi tüm kullanıcılara'));
    }
  });
};

module.exports = {
  getUsers: getUsers
};
