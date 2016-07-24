

'use strict'

var angular = require('angular');
require('angular-route');

var app = angular.module('noteshareApp', ['ngRoute', 'ngStorage']);

require('./services')
require('./directives')
require('./user')
require('./documents')
require('./topLevel')


/**

Modularization references:

>>> Google: split angularjs into files node browserify

>>> https://omarfouad.com/

>>> https://blog.codecentric.de/en/2014/08/angularjs-browserify/
>>> https://github.com/twilson63/angular-browserify-example

https://medium.com/@dickeyxxx/best-practices-for-building-angular-js-apps-266c1a4a6917#.m95vfp6g3

**/




