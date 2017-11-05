'use strict';

let express = require('express');
let router = express.Router();
let helper = require('../helpers');
let categoryController = require('../controllers/categoryController');

router.all(function(req,res,next){
    console.log('girdi');
    next();
});

// USERS
router.get('/',categoryController.getCategorys);
router.post('/',categoryController.insertCategory);
router.delete('/:id',categoryController.deleteCategory);
router.put('/:id',categoryController.updateCategory);
 
module.exports = router;