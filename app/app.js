

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

MODULARIZATION

>>> Google: split angularjs into files node browserify

>>> https://omarfouad.com/

>>> https://blog.codecentric.de/en/2014/08/angularjs-browserify/
>>> https://github.com/twilson63/angular-browserify-example

ORGANIZING CODE

https://medium.com/opinionated-angularjs/scalable-code-organization-in-angularjs-9f01b594bf06#.gsrzlad9h

https://medium.com/@dickeyxxx/best-practices-for-building-angular-js-apps-266c1a4a6917#.m95vfp6g3

TESTING

https://www.smashingmagazine.com/2014/10/introduction-to-unit-testing-in-angularjs/

https://karma-runner.github.io/latest/intro/installation.html
https://www.npmjs.com/package/karma

https://github.com/sitepoint-editors/angular-js-unit-testing-services-controllers-providers/blob/master/tests/serviceSpec.js

http://www.bradoncode.com/blog/2015/02/27/karma-tutorial/
http://jasmine.github.io/2.0/introduction.html

CONTROLLERS

http://www.w3schools.com/angular/angular_controllers.asp

DIRECTIVES

https://www.sitepoint.com/practical-guide-angularjs-directives/

SERVICES

http://www.w3schools.com/angular/angular_services.asp
http://www.ng-newsletter.com/posts/beginner2expert-services.html
http://blog.thoughtram.io/angular/2015/07/07/service-vs-factory-once-and-for-all.html
https://docs.angularjs.org/guide/services
http://stackoverflow.com/questions/13013772/how-do-i-test-an-angularjs-service-with-jasmine

WATCH

http://tutorials.jenkov.com/angularjs/watch-digest-apply.html

CORS

http://stackoverflow.com/questions/23823010/how-to-enable-cors-in-angularjs
http://stackoverflow.com/questions/29547003/angularjs-no-access-control-allow-origin-header-is-present-on-the-requested-r

NG-STORAGE
https://www.npmjs.com/package/ng-storage

**/




