// jshint ignore: start
var express = require('express');
var router = express.Router();

var fs = require('fs');
const solc = require('solc');
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');

const EscrowSale = require('../build/contracts/EscrowSale.json');
const abi = EscrowSale.abi;
const bytecode =EscrowSale.bytecode;

web3.eth.getAccounts(function(error, accounts) {
   console.log(accounts[0])
});

var CoursetroContract = new web3.eth.Contract(abi,'0xcfed223fab2a41b5a5a5f9aaae2d1e882cb6fe2d');

buyer = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef"
seller = "0x821aEa9a577a9b44299B9c15c88cf3087F3b5544"
arbitrator = "0x6330A553Fc93768F612722BB8c2eC78aC90B3bbc"
amount = "150"
//orderId = web3.utils.sha3('234');
orderId = "0xc1912fee45d61c87cc5ea59dae311904cd86b84fee17cc96966216f811ce6a79";
/* GET home page. */
router.get('/pay', function(req, res, next) {
  res.render('pay');
});

router.post('/pay', function(req, res, next) {

return CoursetroContract.methods.createEscrow(buyer,seller,arbitrator,amount,orderId).call({gas: '1443433',from: buyer}, function(error, result){
	   console.log(result)
	   console.log("success")	
	   console.log(error)   
	});

});


module.exports = router;
