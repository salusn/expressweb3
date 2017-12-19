// jshint ignore: start
var express = require('express');
var router = express.Router();

var fs = require('fs');
const solc = require('solc');
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

const input = fs.readFileSync('Token.sol');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts[':Token'].bytecode;

const abi = JSON.parse(output.contracts[':Token'].interface);
const contract = new web3.eth.Contract(abi);

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

const contractInstance = contract.new({
    data: '0x' + bytecode,
    from: web3.eth.coinbase,
    gas: 90000*2
}, (err, res) => {
    if (err) {
        console.log(err);
        return;
    }

    // Log the tx, you can explore status with eth.getTransaction()
    console.log(res.transactionHash);

    // If we have an address property, the contract was deployed
    if (res.address) {
        console.log('Contract address: ' + res.address);
        // Let's test the deployed contract
        testContract(res.address);
    }
});


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
