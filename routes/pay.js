var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/pay', function(req, res, next) {
  res.render('pay');
});

router.post('/pay', function(req, res, next) {
  console.log("paid");
});

module.exports = router;
