// jshint ignore: start
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
//var web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider('http://localhost:8545'));
//console.log(web3)

var net = require('net');
//var web3 = new Web3('/users/myuser/.ethereum/geth.ipc', net); 

var batch = new web3.BatchRequest();
//console.log(web3.eth_accounts)
//web3.eth.getAccounts(console.log);
console.log(web3.eth.privateKey)
//var contract = new web3.eth.Contract();
//console.log(contract);
var index = require('./routes/index');
var users = require('./routes/users');

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
