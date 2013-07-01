//Written by Ryan Lee

//Board Setup:
//Tri-color LED
// pin 12 blue
// pin 10 green
// pin 8 red
// 330 Ohm on each input

'use strict';
/*jslint node:true, indent:2, nomen:true*/

var five = require("johnny-five");
var Hapi = require('hapi');

var board = new five.Board();
var server = Hapi.createServer(8080);

var set = function (r, g, b) {
  console.log('setting rgb(' + r + ', ' + g + ', ' + b + ')');
};

server.route({
  'method' : 'get',
  'path' : '/{path*}',
  'handler' : {
    'directory' : {
      'path' : './public',
      'listing' : false,
      'index' : true
    }
  }
});
server.route({
  'method' : 'post',
  'path' : '/set',
  'handler' : function (req) {
    var r = 0, g = 0, b = 0;
    if (req.payload.r === '1') {
      r = 1;
    }
    if (req.payload.g === '1') {
      g = 1;
    }
    if (req.payload.b === '1') {
      b = 1;
    }
    set(r, g, b);
    req.reply(true);
  }
});

board.on('ready', function () {
  var red, green, blue, leds;
  red = new five.Led(8);
  green = new five.Led(10);
  blue = new five.Led(12);
  leds = new five.Leds();

  set = function (r, g, b) {
    if (!r) {
      red.off();
    } else {
      red.on();
    }
    if (!g) {
      green.off();
    } else {
      green.on();
    }
    if (!b) {
      blue.off();
    } else {
      blue.on();
    }
  };
  this.repl.inject({
    'off' : function () {
      leds.off();
      process.exit();
    }
  });
  server.start();
});

