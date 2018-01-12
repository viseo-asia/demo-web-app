var express = require('express');
var router = express.Router();
const Prometheus = require('prom-client')

/* GET metrics. */
router.get('/', function (req, res, next) {
  res.set('Content-Type', Prometheus.register.contentType)
  res.end(Prometheus.register.metrics())
});

module.exports = router;
