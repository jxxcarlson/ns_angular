'use strict';

var app = require('angular').module('noteshareApp');

app.directive('ngEnter', require('./enterOnKeyPress'))

app.directive('elemReady', require('./elemReady'))

app.directive('file', require('./File'))


  

