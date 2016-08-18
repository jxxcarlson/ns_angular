// http://henriquat.re/modularizing-angularjs/modularizing-angular-applications/modularizing-angular-applications.html
// http://henriquat.re/
// https://www.safaribooksonline.com/blog/2014/03/27/13-step-guide-angularjs-modularization/

'use strict'

var angular = require('angular');
require('angular-route');

var app = angular.module('noteshareApp', ['ui.router', 'ngStorage', 'environment', 
                                          'ngFileUpload', , 'ui.bootstrap',  'ngAnimate',
                                         'cfp.hotkeys', 'angular-confirm']).
    config(function(envServiceProvider) {
        // set the domains and variables for each environment 
        envServiceProvider.config({
            domains: {
                development: ['localhost', 'dev.local'],
                production: ['herokuapp.com', 'herokuapp.com', "manuscripta.herokuapp.com"]
                // anotherStage: ['domain1', 'domain2'], 
                // anotherStage: ['domain1', 'domain2'] 
            },
            vars: {
                development: {
                    apiUrl: "http://jxxmbp.local:2300/v1",
                    clientUrl: "http://jxxmbp.local:3000"
                    // antoherCustomVar: 'lorem', 
                    // antoherCustomVar: 'ipsum' 
                },
                production: {
                    apiUrl: "http://xdoc-api.herokuapp.com/v1",
                    clientUrl: "http://manuscripta.herokuapp.com"
                    // antoherCustomVar: 'lorem', 
                    // antoherCustomVar: 'ipsum' 
                }
                // anotherStage: { 
                // 	customVar: 'lorem', 
                // 	customVar: 'ipsum' 
                // } 
            }
        });
 
        // run the environment check, so the comprobation is made 
        // before controllers and services are built 
        envServiceProvider.check();
    });

angular.module('filters-module', [])
.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}])

require('./topLevel')

require('./services')
require('./directives')

require('./user')
require('./documents')
require('./images')
require('./search')
require('./site')




/**

MENU

>>> https://angular-ui.github.io/bootstrap/ 

EDITOR

WOW! >>> https://github.com/sachinchoolur/angular-trix
     >>> http://plnkr.co/edit/hSzwlzUmRQoUtZJke2C4?p=preview
     
>>> https://github.com/fraywing/textAngular
>>> https://vitalets.github.io/angular-xeditable/
>>> https://docs.angularjs.org/api/ng/directive/textarea

FILE UPLOAD
Cheyne Wallace post, new version: http://www.cheynewallace.com/uploading-to-s3-with-angularjs-and-pre-signed-urls/
http://stackoverflow.com/questions/31590424/cant-upload-files-to-amazon-s3-using-angularjs-with-pre-signed-url

// LOOKS PROMISING >>> DRAG AND DROP UPLOADS ALSO!
// NG-FILE-UPLOAD  >>> https://github.com/danialfarid/ng-file-upload/wiki/Direct-S3-upload-and-Node-signing-example
//                 >>> https://github.com/danialfarid/ng-file-upload
//                 >>> https://angular-file-upload.appspot.com/

MODULARIZATION

>>> Google: split angularjs into files node browserify

>>> https://omarfouad.com/

>>> https://blog.codecentric.de/en/2014/08/angularjs-browserify/
>>> https://github.com/twilson63/angular-browserify-example

>>> GOOD >>> http://henriquat.re/modularizing-angularjs/modularizing-angular-applications/modularizing-angular-applications.html
>>> http://henriquat.re/

^^^ GOOD::: REQUIRING VS BROSERIFYING: http://developer.telerik.com/featured/requiring-vs-browerifying-angular/

ORGANIZING CODE

https://medium.com/opinionated-angularjs/scalable-code-organization-in-angularjs-9f01b594bf06#.gsrzlad9h

https://medium.com/@dickeyxxx/best-practices-for-building-angular-js-apps-266c1a4a6917#.m95vfp6g3

TESTING

^^^ BRADONCODE: http://www.bradoncode.com/blog/2015/02/27/karma-tutorial/

https://www.smashingmagazine.com/2014/10/introduction-to-unit-testing-in-angularjs/
::: https://github.com/mhevery/jasmine-node
::: http://blog.teamtreehouse.com/26017-2
::: http://webpack.github.io/docs/motivation.html
::: COMMON JS ::: http://www.commonjs.org/   
    :::   http://arstechnica.com/business/2009/12/commonjs-effort-sets-javascript-on-path-for-world-domination/

https://karma-runner.github.io/latest/intro/installation.html
https://www.npmjs.com/package/karma

https://github.com/sitepoint-editors/angular-js-unit-testing-services-controllers-providers/blob/master/tests/serviceSpec.js

http://www.bradoncode.com/blog/2015/02/27/karma-tutorial/
http://jasmine.github.io/2.0/introduction.html

CONTROLLERS

http://www.w3schools.com/angular/angular_controllers.asp

DIRECTIVES

https://www.sitepoint.com/practical-guide-angularjs-directives/
child controlers >>> https://rclayton.silvrback.com/parent-child-controller-communication

SERVICES

http://www.w3schools.com/angular/angular_services.asp
http://www.ng-newsletter.com/posts/beginner2expert-services.html
http://blog.thoughtram.io/angular/2015/07/07/service-vs-factory-once-and-for-all.html
https://docs.angularjs.org/guide/services
http://stackoverflow.com/questions/13013772/how-do-i-test-an-angularjs-service-with-jasmine

VIEW

toggle >> http://jsfiddle.net/geniuscarrier/tKZjZ/

QUERY STRINGS

http://www.suleski.name/getting-query-string-parameters-with-angularjs/

SCOPES

http://jimhoskins.com/2012/12/14/nested-scopes-in-angularjs.html  << GOOD

WATCH

http://tutorials.jenkov.com/angularjs/watch-digest-apply.html

CORS

http://stackoverflow.com/questions/23823010/how-to-enable-cors-in-angularjs
http://stackoverflow.com/questions/29547003/angularjs-no-access-control-allow-origin-header-is-present-on-the-requested-r

NG-STORAGE
https://www.npmjs.com/package/ng-storage

**/




