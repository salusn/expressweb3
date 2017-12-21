// jshint ignore: start
var express = require('express');
var router = express.Router();

var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

const EscrowSale = require('../build/contracts/EscrowSale.json');
const abi = EscrowSale.abi;
const bytecode =EscrowSale.bytecode;

web3.eth.defaultAccount = '0x69043fb55436609846cd209627d8662a67cc9e14';
var CoursetroContract = new web3.eth.Contract(abi,'0x298e0c2a346519b836aebb04bf21181acbedec9e');

//console.log(CoursetroContract)

/* GET home page. */
router.get('/member', function(req, res, next) {
  res.render('member');
});



router.post('/member', function(req, res, next) {
	
	var newadmin = req.body.address;

	return CoursetroContract.methods.addMember(newadmin).call({from: web3.eth.defaultAccount}, function(error, result){

	});


});

module.exports = router;
