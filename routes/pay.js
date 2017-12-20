// jshint ignore: start
var express = require('express');
var router = express.Router();

var fs = require('fs');
const solc = require('solc');
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

const input = fs.readFileSync('EscrowSale.sol');
const output = solc.compile(input.toString(), 1);

const bytecode = output.contracts[':EscrowSale'].bytecode;

const abi = JSON.parse(output.contracts[':EscrowSale'].interface);
web3.eth.defaultAccount = '0x4c03589d6eC8D5718dBF992FD535E3b25c4F94AE';
//const contract = new web3.eth.Contract(abi);
var CoursetroContract = new web3.eth.Contract(abi);
//console.log(CoursetroContract.methods.createEscrow)

//createEscrow(address _buyer,address _seller,address _arbitrator,uint _amount,bytes32 orderId)

/* GET home page. */
router.get('/pay', function(req, res, next) {
  res.render('pay');
});

router.post('/pay', function(req, res, next) {
//   var code = "603d80600c6000396000f3007c01000000000000000000000000000000000000000000000000000000006000350463c6888fa18114602d57005b6007600435028060005260206000f3";

// web3.eth.sendTransaction({
//     from: '0x4c03589d6eC8D5718dBF992FD535E3b25c4F94AE',
//     data: code // deploying a contracrt
// }, function(error, hash){
//     console.log(hash)
//     res.redirect('/');
// });

//})
CoursetroContract.methods.createEscrow({buyer: "0x49889df654e96eaa1696bfbf4836479fd8c4fa9a",
    seller: "0xb3346b74d5e2f381d2e8e31822c24777e4a6a59c",
    arbitrator: "0xa533408e4db22f328cd0a997024f029e5c023e16",
    amount: "123",
    orderId: "5627"})

.then(function(err,result){
    // will be fired once the receipt its mined
});

    //     buyer = "0x49889df654e96eaa1696bfbf4836479fd8c4fa9a"
    //     seller = "0xb3346b74d5e2f381d2e8e31822c24777e4a6a59c"
    //     arbitrator = "0xa533408e4db22f328cd0a997024f029e5c023e16"
    //     amount = "123"
    //     orderId = "5627"

    // CoursetroContract.methods.createEscrow(buyer,seller,arbitrator,amount,orderId)
    // console.log(CoursetroContract.methods.createEscrow(buyer,seller,arbitrator,amount,orderId))
});

function testContract(address) {
    // Reference to the deployed contract
    const token = contract.at(address);
    // Destination account for test
    const dest_account = '0x002D61B362ead60A632c0e6B43fCff4A7a259285';

    // Assert initial account balance, should be 100000
    const balance1 = token.balances.call(web3.eth.coinbase);
    console.log(balance1 == 1000000);

    // Call the transfer function
    token.transfer(dest_account, 100, {from: web3.eth.coinbase}, (err, res) => {
        // Log transaction, in case you want to explore
        console.log('tx: ' + res);
        // Assert destination account balance, should be 100 
        const balance2 = token.balances.call(dest_account);
        console.log(balance2 == 100);
    });
}

module.exports = router;
