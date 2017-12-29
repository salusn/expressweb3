// jshint ignore: start
var express = require('express');
var router = express.Router();

var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'HTTP://127.0.0.1:7545');

const EscrowSale = require('../build/contracts/EscrowSale.json');
const abi = EscrowSale.abi;
const bytecode =EscrowSale.bytecode;

var CoursetroContract = new web3.eth.Contract(abi,'0xf204a4ef082f5c04bb89f7d5e6568b796096735a');

buyer = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef"
var orderId = "0xc1912fee45d61c87cc5ea59dae311904cd86b84fee17cc96966216f811ce6a79";
amount = 150
var load_up = {
    from: buyer, 
    //to: web3.eth.defaultAccount, 
    value: 150,
}

/* GET home page. */
router.get('/deposit', function(req, res, next) {
  res.render('deposit');
});


router.post('/deposit', function(req, res, next) {
	console.log("dd")
//+return CoursetroContract.methods.depositToEscrow(orderId).call(load_up);
return CoursetroContract.methods.depositToEscrow(orderId).call({load_up}, function(error, result){
	   console.log(result)	
	   console.log(error)   
	});
    //console.log(ee)
 });



	
module.exports = router;	
