var express = require('express');
var fs = require('fs');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var HOST = null;
var PORT = process.env.PORT || 8080;

// start webserver
app.use('/assets', express.static(__dirname + '/views/assets/'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

server.listen(PORT);
console.log('server started');

// start game server
require('./io')(io);