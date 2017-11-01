'use strict';

let express = require('express');
let router = express.Router();
let helper = require('../helpers');
let userController = require('../controllers/userController');

router.all(function(req,res,next){
    console.log('girdi');
    next();
});

// USERS
router.get('/',userController.getUsers);
router.delete('/:id',userController.deleteUser);

router.get('/gel',function(req,res){
     //res.send('hello');
   userController.getUsers(req,res);
});

module.exports = router;