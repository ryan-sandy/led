//Written by Ryan Lee

'use strict';
/*jslint browser:true, indent:2, nomen:true*/
/*globals $, ko */

$(document).ready(function () {
  var Main, m;
  Main = function () {
    this.color = ko.observable();
    this.color.subscribe(function (val) {
      var data = {
        'r' : 0,
        'g' : 0,
        'b' : 0
      };
      if (val[0] === '1') {
        data.r = 1;
      }
      if (val[1] === '1') {
        data.g = 1;
      }
      if (val[2] === '1') {
        data.b = 1;
      }
      $.post('/set', data);
    });
  };
  m = new Main();
  ko.applyBindings(m);
});
