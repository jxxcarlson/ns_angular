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
// app.controller('AboutController', require('./controllers/AboutController'))

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
    
        .state('site', {
            url: '/public/:id', 
            templateUrl : 'pages/site.html',
            controller  : 'SiteController'
        })
    
        .state('user', {
            url: '/user/:id', 
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
            url: '/documents', 
            templateUrl : 'pages/documents.html',
            controller  : 'documentsController'
        })
    

        .state('documentsId', {
            url: '/documents/:id',
            templateUrl : 'pages/documents.html',
            controller  : 'documentsController'
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
    
        .state('imagesId', {
            url: '/images/:id',
            templateUrl : 'pages/images.html',
            controller  : 'ImagesController'
        })
    

        .state('imageupload', {
            url: '/imageupload',
            templateUrl : 'pages/imageupload.html',
            controller  : 'ImageUploadController'
        });
    
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    
});


// create the controller and inject Angular's $scope
app.controller('MainController', function($scope, $http, $state, $location, 
                        foo, UserService, SearchService, envService) {
    $scope.message = 'This is the home page'
    foo.myFunc('MainController')
    $scope.currentSite = UserService.getCurrentSite()
    $scope.currentSiteURL = "site/"+UserService.getCurrentSite()
     
    $scope.accessTokenValid = UserService.accessTokenValid()
    console.log('$scope.accessTokenValid = ' + $scope.accessTokenValid)
    
    envService.set('development');
    
});


app.controller('AboutController', function($scope, foo, envService) {
    
    
    $scope.message = 'Look! I am an about page ....';
    foo.myFunc('AboutController')   

    $scope.clientUrl = envService.read('clientUrl')
    $scope.apiUrl = envService.read('apiUrl')
    
});



app.controller('stageController', function ($scope) { $scope.repeat = 5; });


    