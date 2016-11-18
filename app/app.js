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
require('./admin')





