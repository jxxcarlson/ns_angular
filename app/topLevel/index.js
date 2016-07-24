'use strict';

var app = require('angular').module('noteshareApp');

    // configure our routes

app.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'MainController'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'aboutController'
        })


        .when('/newdocument', {
            templateUrl : 'pages/newdocument.html',
            controller  : 'newDocumentController'
        })

        // route for the contact page
        .when('/documents', {
            templateUrl : 'pages/documents.html',
            controller  : 'documentsController'
        })

        .when('/documents/:id', {
            templateUrl : 'pages/documents.html',
            controller  : 'documentsController'
        })


        .when('/editdocument', {
            templateUrl : 'pages/editdocument.html',
            controller  : 'editDocumentController'
        })

        .when('/editdocument/:id', {
            templateUrl : 'pages/editdocument.html',
            controller  : 'editDocumentController'
        })

        .when('/signup', {
            templateUrl : 'pages/signup.html',
            controller  : 'SignupController'
        });
});



// create the controller and inject Angular's $scope
app.controller('MainController', function($scope, $http, foo) {
  foo.myFunc('MainController')
});




app.controller('aboutController', function($scope, foo) {
    $scope.message = 'Look! I am an about page ....';
    foo.myFunc('aboutController')

});


    