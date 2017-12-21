// jshint ignore: start
var express = require('express');
var router = express.Router();

var fs = require('fs');
const solc = require('solc');
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

const EscrowSale = require('../build/contracts/EscrowSale.json');
const abi = EscrowSale.abi;
const bytecode =EscrowSale.bytecode;

web3.eth.defaultAccount = '0x69043fb55436609846cd209627d8662a67cc9e14';
var CoursetroContract = new web3.eth.Contract(abi,'0x3ea6748889a941adb45dd410aa0e6e1ab403d750');

//console.log(CoursetroContract.methods.createEscrow)

buyer = "0x408678574c6cfb8675928d01b3b9f6f1ed249151"
seller = "0x7ef55c345a75cf0f6726c09aa559667ae6e883a6"
arbitrator = "0x6e87dd23faa98b6d7f4359830d9c19848a4ba491"
amount = "150"
orderId = web3.utils.sha3('234');
console.log(orderId)
/* GET home page. */
router.get('/pay', function(req, res, next) {
  res.render('pay');
});

router.post('/pay', function(req, res, next) {

return CoursetroContract.methods.createEscrow(buyer,seller,arbitrator,amount,orderId).call({gas: '1443433',from: buyer}, function(error, result){
	   console.log(result)	
	   console.log(error)   
	});

});


module.exports = router;
