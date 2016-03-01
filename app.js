var express = require('express');
var fs = require('fs');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var Snake = require('./snake');

var HOST = null;
var PORT = process.env.PORT || 8080;

var autoClient = 1;
var snakes = [];

app.use('/assets', express.static(__dirname + '/views/assets/'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

server.listen(PORT);

io.on('connection', function(client) {
  var clientId, clientSnake;
  
  clientId = autoClient;
  clientSnake = new Snake(clientId);
  autoClient += 1;
  snakes.push(clientSnake);
  
  console.log('someone connected (' + clientId + ')');
  
  client.emit('id', clientId);
  
  client.on('move', function(direction) {
    clientSnake.direction = direction;
  });
  
  client.on('disconnect', function() {
    snakes.remove(clientSnake);
    console.log('someone disconnected (' + clientId + ')');
  });
});

function updateState() {
  var snake, _i, _len;
  for (_i = 0, _len = snakes.length; _i < _len; _i++) {
    snake = snakes[_i];
    snake.doStep();
  }
  checkCollisions();
  return io.emit('snakes', snakes);
};

function checkCollisions() {
  var other, resetSnakes, snake, _i, _j, _k, _len, _len2, _len3, _results;
  resetSnakes = [];
  for (_i = 0, _len = snakes.length; _i < _len; _i++) {
    snake = snakes[_i];
    if (snake.blocksSelf()) {
      resetSnakes.push(snake);
    }
    for (_j = 0, _len2 = snakes.length; _j < _len2; _j++) {
      other = snakes[_j];
      if (other !== snake) {
        if (other.blocks(snake)) {
          resetSnakes.push(snake);
          other.addKill();
        }
      }
    }
  }
  _results = [];
  for (_k = 0, _len3 = resetSnakes.length; _k < _len3; _k++) {
    snake = resetSnakes[_k];
    _results.push(snake.reset());
  }
  return _results;
}

Array.prototype.remove = function(e) {
  var t, _ref;
  if ((t = this.indexOf(e)) > -1) {
    return ([].splice.apply(this, [t, t - t + 1].concat(_ref = [])), _ref);
  }
};

var tick = setInterval(updateState, 100);