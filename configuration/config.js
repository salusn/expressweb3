// jshint ignore: start
var express = require('express');
var router = express.Router(); 

var fs = require('fs');
const solc = require('solc');
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');


var buyer = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef";
var seller = "0x821aEa9a577a9b44299B9c15c88cf3087F3b5544";
var arbitrator = "0x6330A553Fc93768F612722BB8c2eC78aC90B3bbc";


module.exports = router;

