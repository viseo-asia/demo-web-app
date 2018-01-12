const express = require('express');
const router = express.Router();
const os = require('os')
const Lynx = require('lynx')

const metrics = new Lynx('telegraf', 8125)

/* GET home page. */
router.get('/', function(req, res, next) {
  metrics.increment('service.home')
  res.render('index', { title: 'Viseo Hong Kong - Digital Innovation Labs', hostname: os.hostname, timestamp: new Date().toLocaleString() });
});

module.exports = router;
