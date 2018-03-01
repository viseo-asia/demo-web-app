const express = require('express');
const router = express.Router();
const os = require('os')
const Lynx = require('lynx')

const metrics = new Lynx('telegraf', 8125)

// secrets
//TODO:rudijs add nconf module to read these files
// const fs = require('fs')
// const dbUsername = fs.readFileSync('/run/secrets/database_username')
// const dbPassword = fs.readFileSync('/run/secrets/database_password')
const dbUsername = '/run/secrets/database_username'
const dbPassword = '/run/secrets/database_password'

/* GET home page. */
router.get('/', function(req, res, next) {
  metrics.increment('service.home')
  res.render('index', { 
    title: 'Viseo Hong Kong - Digital Innovation Labs', 
    hostname: os.hostname, 
    timestamp: new Date().toLocaleString(),
    dbUsername,
    dbPassword
   });
});

module.exports = router;
