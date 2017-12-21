// jshint ignore: start
var express = require('express');
var router = express.Router();

var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

const EscrowSale = require('../build/contracts/EscrowSale.json');
const abi = EscrowSale.abi;
const bytecode =EscrowSale.bytecode;

web3.eth.defaultAccount = '0x69043fb55436609846cd209627d8662a67cc9e14';
var CoursetroContract = new web3.eth.Contract(abi,'0xe63a948d589166d15b49d8d815609cc140092c5d');
buyer = "0x408678574c6cfb8675928d01b3b9f6f1ed249151"
orderId = web3.utils.sha3('234');
amount = "150"
//console.log(CoursetroContract)

/* GET home page. */
router.get('/deposit', function(req, res, next) {
  res.render('deposit');
});



router.post('/deposit', function(req, res, next) {
	return CoursetroContract.methods.depositToEscrow(orderId).call({from: buyer,value:"150"}, function(error, result){
          console.log("deposit")
          console.log(result)
          console.log(error)
    
	});

})
	
module.exports = router;	
