'use strict';

const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

let app = express();

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: false}));

var logStream = fs.createWriteStream(__dirname+'/project.log',{flags:'a'});
app.use(morgan('dev',{
  stream: logStream
}));
app.use(morgan('dev'));

var router = require('./apiRouter');

app.use('/',router);
 


module.exports = app;
