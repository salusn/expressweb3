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

/* GET home page. */
router.get('/member', function(req, res, next) {
  res.render('member');
});



router.post('/member', function(req, res, next) {
	
	var newadmin = req.body.address;

	return CoursetroContract.methods.addMember(newadmin).call({from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'}, function(error, result){
          //console.log(true)
          if(result == true){
          
          	console.log("true")
          }
    
	});


});

module.exports = router;
