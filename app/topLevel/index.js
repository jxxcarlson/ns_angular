/***********

Advanced routing and resolves
>>> https://medium.com/opinionated-angularjs/advanced-routing-and-resolves-a2fcbf874a1c#.q9i3lmnjp

>>> https://scotch.io/tutorials/angular-routing-using-ui-router

>>> http://www.funnyant.com/angularjs-ui-router/

>>> https://github.com/angular-ui/ui-router

>>> https://github.com/angular-ui/ui-router/wiki

>>> https://github.com/angular-ui/ui-router/issues/64
>>> http://stackoverflow.com/questions/23585065/angularjs-ui-router-change-url-without-reloading-state


**************/



'use strict';

var app = require('angular').module('noteshareApp');


app.controller('MenuController', require('./controllers/MenuController'))
app.controller('MainController', require('./controllers/MainController'))
app.controller('AboutController', require('./controllers/AboutController'))
app.controller('UserPreferenceController', require('./controllers/UserPreferenceController'))


app.constant("mathJaxDelay", 1100)
app.constant("notFoundErrorDocumentId", 11)
app.constant("notFoundErrorDocumentTitle", 11)

    // configure our routes

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider



        // route for the home page
        .state('home', {
            url: '/',  
            templateUrl : 'pages/signin.html',
            controller  : 'SigninController'
        })
    
        .state('about', {
            url: '/about',
            templateUrl : 'pages/about.html',
            controller  : 'AboutController'
        })

        .state('user', {
            url: '/user/:id',
            templateUrl : 'pages/site.html',
            controller  : 'SiteController'
        })

    /***
    
        .state('site', {
            url: '/public/:id', 
            templateUrl : 'pages/site.html',
            controller  : 'SiteController'
        })
    

        .state('siteDocument', {
            url: '/site/:site/:doc_id', 
            templateUrl : 'pages/site.html',
            controller  : 'SiteDocumentController'
        })
    
        .state('foo', {
            url: 'foo', 
            templateUrl : 'pages/about.html',
            controller  : 'AboutController'
        })
    
        .state('foo2', {
            url: 'foo/:id', 
            templateUrl : 'pages/about.html',
            controller  : 'AboutController'
        })

     **/
    
    
        .state('signin', {
            url: '/signin',
            templateUrl : 'pages/signin.html',
            controller  : 'SigninController'
        })


        .state('newdocument', {
            url: '/newdocument',
            templateUrl : 'pages/newdocument.html',
            controller  : 'newDocumentController'
        })

        // route for the contact page
        .state('documents', {
            url: '/documents/:id?option',
            templateUrl : 'pages/documents.html',
            controller  : 'documentsController'
        })


        .state('document', {
            url: '/documents/:id',
            templateUrl : 'pages/documents.html',
            controller  : 'documentsController'
        })

        .state('printdocument', {
            url: '/printdocument/:id',
            templateUrl : 'pages/printdocument.html',
            controller  : 'PrintDocumentController'
        })

        .state('exportlatex', {
            url: '/exportlatex/:id',
            templateUrl : 'pages/exportlatex.html',
            controller  : 'ExportLatexController'
        })


        .state('editdocument', {
            url: '/editdocument',
            templateUrl : 'pages/editdocument.html',
            controller  : 'editDocumentController'
        })

        .state('editOneDocument', {
            url: '/editdocument/:id',
            templateUrl : 'pages/editdocument.html',
            controller  : 'editDocumentController'
        })


        // http://benfoster.io/blog/ui-router-optional-parameters
        // http://best-web-creation.com/articles/view/id/angular-js-ui-router-opt-params?lang=en
        // http://stackoverflow.com/questions/30225424/angular-ui-router-more-optional-parameters-in-one-state
        .state('deletedocument', {
            url: '/deletedocument/mode',
            templateUrl : 'pages/documents.html',
            controller  : 'DeleteDocumentController',
            params : { mode: {value: 'soft'} }


            /*
            controller: function($scope, $stateParams) {
                $scope.mode = $stateParams.mode;
            } */
        })

        .state('signup', {
            url: '/signup',
            templateUrl : 'pages/signup.html',
            controller  : 'SignupController'
        })
    
        .state('images', {
            url: '/images',
            templateUrl : 'pages/images.html',
            controller  : 'ImagesController'
        })
    
        .state('getimage', {
            url: '/images/:id',
            templateUrl: 'pages/images.html',
            controller  : 'ImagesController'
        })

        .state('userpreferences', {
            url: '/userpreferences',
            templateUrl: 'pages/userpreferences.html',
            controller: 'UserPreferenceController'
        })

        .state('imageupload', {
            url: '/imageupload',
            templateUrl : 'pages/imageupload.html',
            controller  : 'ImageUploadController'
        })


        .state('backups', {
            url: '/backups',
            templateUrl: 'pages/backups.html',
            controller: 'BackupController'
        })

        .state('backupmanager', {
            url: '/backupmanager?id',
            templateUrl: 'pages/backupmanager.html',
            controller: 'BackupManagerController'
        })

        .state('admin', {
            url: '/admin',
            templateUrl: 'pages/admin.html',
            controller: 'AdminController'
        })

        // This following enables requests like
        // http://www.manuscripta/go/jc.home
        // http://www.manuscripta/go/jc.qft
        // where jc.home, jc.qft is the identifier of a document.
        // these are namespace by the prefix USERNAME.

        .state('go', {
            url: '/:id',
            templateUrl : 'pages/documents.html',
            controller  : 'documentsController'
        })

    
        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });


    
});





app.controller('stageController', function ($scope) { $scope.repeat = 5; });


    