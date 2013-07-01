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
var board = new five.Board();

board.on('ready', function () {
  var red, green, blue, leds;
  red = new five.Led(8);
  green = new five.Led(10);
  blue = new five.Led(12);
  leds = new five.Leds();
  this.repl.inject({
    'white' : function () {
      leds.on();
    },
    'set' : function (r, g, b) {
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
    },
    'off' : function () {
      leds.off();
    }
  });
});
