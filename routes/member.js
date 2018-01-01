// jshint ignore: start
var express = require('express');
var router = express.Router();

var fs = require('fs');
const solc = require('solc');

var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');

//const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

const EscrowSale = require('../build/contracts/EscrowSale.json');
const abi = EscrowSale.abi;
const bytecode =EscrowSale.bytecode;

web3.eth.getAccounts(function(error, accounts) {
  // console.log(accounts[0])
});

// var CoursetroContract = new web3.eth.Contract(abi, '0x345ca3e014aaf5dca488057592ee47305d9b3e10', {
//     from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57', // default from address
//     gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
// });

var CoursetroContract = new web3.eth.Contract(abi,'0x345ca3e014aaf5dca488057592ee47305d9b3e10');

/* GET home page. */
router.get('/member', function(req, res, next) {
  res.render('member');
});



router.post('/member', function(req, res, next) {
	
	var newadmin = req.body.address;

	return CoursetroContract.methods.addMember(newadmin).call({from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'}, function(error, result){
          //console.log(true)
          
          	console.log(result)
          
    
	});


});

module.exports = router;
