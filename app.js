// jshint ignore: start
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
var net = require('net');
var batch = new web3.BatchRequest();
//web3.eth.getAccounts(console.log);

// web3.eth.getAccounts()
// .then(console.log);
web3.eth.defaultAccount = '0x4c03589d6eC8D5718dBF992FD535E3b25c4F94AE';
// web3.eth.getBalance("0x4c03589d6eC8D5718dBF992FD535E3b25c4F94AE")
// .then(console.log);

// web3.eth.getBlockTransactionCount("0x15A45cAC511550c2c0fc7678Eb47a8a145376d37")
// .then(console.log);



var code = "603d80600c6000396000f3007c01000000000000000000000000000000000000000000000000000000006000350463c6888fa18114602d57005b6007600435028060005260206000f3";

web3.eth.sendTransaction({
    from: '0x4c03589d6eC8D5718dBF992FD535E3b25c4F94AE',
    data: code // deploying a contracrt
}, function(error, hash){
    console.log(hash)
});

// using the promise
// web3.eth.sendTransaction({
//     from: '0x4c03589d6eC8D5718dBF992FD535E3b25c4F94AE',
//     to: '0x6bce56ff61094d8bD4C2919bA87e49aE0bB5F204',
//     value: '1000000000000000'
// })
// .then(function(receipt){
//     console.log(receipt)
// });

var index = require('./routes/index');
var users = require('./routes/users');
var pay = require('./routes/pay');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.get('/pay', pay);
app.post('/pay', pay);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
