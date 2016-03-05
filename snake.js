'use strict';

var STAGE_WIDTH = 49;
var STAGE_HEIGHT = 49;
var SNAKE_LENGTH = 8;

class Snake {
  constructor(id) {
    this.id = id;
    this.reset();
    this.kills = 0;
    this.deaths = 0;
  }
  
  addKill() {
    this.kills++;
    return this.length = this.elements.unshift([-1,-1]);
  }
  
  reset() {
    var i, rH;
    rH = Math.floor(Math.random() * 49);
    this.deaths++;
    this.length = SNAKE_LENGTH;
    this.direction = "right";
    return this.elements = (function() {
      var _ref, _results;
      _results = [];
      for (i = _ref = this.length; _ref <= 1 ? i <= 1 : i >= 1; _ref <= 1 ? i++ : i--) {
        _results.push([-i, rH]);
      }
      return _results;
    }).call(this);
  }
  
  doStep() {
    var i, _ref;
    for (i = 0, _ref = this.length - 2; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
      this.moveTail(i);
    }
    return this.moveHead();
  }
  
  moveTail(i) {
    this.elements[i][0] = this.elements[i + 1][0];
    return this.elements[i][1] = this.elements[i + 1][1];
  }
  
  moveHead() {
    var head;
    head = this.length - 1;
    switch (this.direction) {
      case "left":
        this.elements[head][0] -= 1;
        break;
      case "right":
        this.elements[head][0] += 1;
        break;
      case "up":
        this.elements[head][1] -= 1;
        break;
      case "down":
        this.elements[head][1] += 1;
    }
    if (this.elements[head][0] < 0) {
      this.elements[head][0] = STAGE_WIDTH;
    }
    if (this.elements[head][1] < 0) {
      this.elements[head][1] = STAGE_HEIGHT;
    }
    if (this.elements[head][0] > STAGE_WIDTH) {
      this.elements[head][0] = 0;
    }
    if (this.elements[head][1] > STAGE_HEIGHT) {
      return this.elements[head][1] = 0;
    }
  }
  
  head() {
    return this.elements[this.length - 1];
  }
  
  blocks(other) {
    var collision, element, head, _i, _len, _ref;
    head = other.head();
    collision = false;
    _ref = this.elements;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      element = _ref[_i];
      if (head[0] === element[0] && head[1] === element[1]) {
        collision = true;
      }
    }
    return collision;
  }
  
  blocksSelf() {
    var collision, head, i, _ref;
    head = this.head();
    collision = false;
    for (i = 0, _ref = this.length - 2; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
      if (head[0] === this.elements[i][0] && head[1] === this.elements[i][1]) {
        collision = true;
      }
    }
    return collision;
  }
  
  getLength() {
    return this.length
  }
  
  addLength(i) {
    this.length + i;
  }
  
}

module.exports = Snake;