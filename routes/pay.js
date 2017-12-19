// jshint ignore: start
var express = require('express');
var router = express.Router();
const solc = require('solc');
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

/* GET home page. */
router.get('/pay', function(req, res, next) {
  res.render('pay');
});

router.post('/pay', function(req, res, next) {
  var code = "603d80600c6000396000f3007c01000000000000000000000000000000000000000000000000000000006000350463c6888fa18114602d57005b6007600435028060005260206000f3";

web3.eth.sendTransaction({
    from: '0x4c03589d6eC8D5718dBF992FD535E3b25c4F94AE',
    data: code // deploying a contracrt
}, function(error, hash){
    console.log(hash)
    res.redirect('/');
});
});

module.exports = router;
