'use strict';

let express = require('express');
var router = express.Router();
let helper = require('./helpers');

 
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  console.log('middillede');
  next();
});

let userRoute = require('./routers/userRoute');

// USERS
router.use('/users',userRoute);


module.exports = router;