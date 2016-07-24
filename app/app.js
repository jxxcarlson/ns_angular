
/**

Modularization references:

>>> Google: split angularjs into files node browserify

>>> https://omarfouad.com/

>>> https://blog.codecentric.de/en/2014/08/angularjs-browserify/
>>> https://github.com/twilson63/angular-browserify-example

https://medium.com/@dickeyxxx/best-practices-for-building-angular-js-apps-266c1a4a6917#.m95vfp6g3

**/

'use strict'

var angular = require('angular');
require('angular-route');

var app = angular.module('noteshareApp', ['ngRoute', 'ngStorage']);

require('./services')






    /*
This directive allows us to pass a function in on an enter key to do what we want.
http://fiddle.jshell.net/lsconyer/bktpzgre/1/light/

That’s it.  Now just add ng-enter="myFunction()" to any element in your partial
that detects keystrokes. This has helped me a ton and added a lot of easy
functionality to an already great AngularJS system.  If you have any other
great directives or AngularJS tips please leave them below in the comments.
 */
 angular.module('noteshareApp').directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
});

 angular.module('noteshareApp').directive( 'elemReady', function( $parse ) {
   return {
       restrict: 'A',
       link: function( $scope, elem, attrs ) {
          elem.ready(function(){
            $scope.$apply(function(){
                var func = $parse(attrs.elemReady);
                func($scope);
            })
          })
       }
    }
})

 

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
                controller  : 'signupController'
            });
    });

    // create the controller and inject Angular's $scope
    app.controller('MainController', function($scope, $http, foo) {
      foo.myFunc('MainController')
    });

    /* REFERENCE: https://github.com/gsklee/ngStorage */
    app.controller('searchController', [
      '$scope',
      '$http',
      '$localStorage',
      function($scope, $http, $localStorage) {
        $scope.doSearch = function(){
            console.log('Search text: ' + $scope.searchText);
            $http.get('http://localhost:2300/v1/documents' + '?' + $scope.searchText  )
            .then(function(response){
              console.log(response.data['status'])
              console.log('Number of documents: ' + response.data['document_count'])
              var jsonData = response.data
              var documents = jsonData['documents']
              $localStorage.documents = documents
            });

      };
    }]);


    app.controller('aboutController', function($scope, foo) {
        $scope.message = 'Look! I am an about page ....';
        foo.myFunc('aboutController')

    });


    app.controller('SigninController',

      function($scope, $localStorage, UserApiService) {
        $scope.submit = function() {
          UserApiService.login($scope.username, $scope.password)
          .then(
                function (result) {
                  if ($localStorage.loginStatus == 200) {
                    $scope.message = 'Success!'
                  } else {
                    $scope.message = 'Sorry'
                  }
                    // promise was fullfilled (regardless of outcome)
                    // checks for information will be peformed here
                },
                function (error) {
                    // handle errors here
                    // console.log(error.statusText);
                    console.log('ERROR!');
                }
            );
        }
      });


    app.controller('signupController', [
      '$scope',
      '$http',
      '$localStorage',
      function($scope, $http, $localStorage) {
        $scope.submit = function() {
          var parameter = JSON.stringify({username:$scope.username, email:$scope.email, password: $scope.password, password_confirmation: $scope.passwordConfirmation});
          console.log(parameter);

          $http.post('http://localhost:2300/v1/users/create', parameter)
          .then(function(response){
            if (response.data['status'] == 200) {
              $scope.message = 'Success!'
              $localStorage.access_token = response.data['token']
            } else {
              $scope.message = response.data['error']
            }
            console.log('status = ' + String(response.data['status']))
          });


        }
      }
    ]);


    app.controller('newDocumentController', [
      '$scope',
      '$http',
      '$localStorage',
      function($scope, $http, $localStorage) {
        $scope.submit = function() {

          console.log('CREATE DOCUMENT')
          console.log("create new document: " + $scope.title)

          var access_token = $localStorage.access_token
          console.log("TOKEN: " + String(access_token))

          var parameter = JSON.stringify({title:$scope.title, token:access_token });
          console.log('parameter: ' + parameter);

          $http.post('http://localhost:2300/v1/documents', parameter)
          .then(function(response){
            if (response.data['status'] == 200) {
              $scope.message = 'Success!'
            } else {
              $scope.message = response.data['error']
            }
            console.log('status = ' + String(response.data['status']))
          });


        }
      }
    ]);

    /*
    REFERENCE: https://github.com/gsklee/ngStorage

    For example, URL’s like /route/12345?a=2&b=3 will match the route /route
    with id 12345 and query string variables a & b. Now those values can
    be accessed in controller code using $routeParams service. Any parameter
    [preceded by ':'] in route can be accessed in controller by it’s name
    using $routeParams.paramName. Additionally, any query string passed
    in URL can be accessed in controller using $routeParams.variableName
    */
    app.controller('documentsController', [
      '$scope',
      '$localStorage',
      '$routeParams',
      '$http',
      '$sce',

      function($scope, $localStorage, $routeParams, $http, $sce ) {

        var id;
        if ($routeParams.id != undefined) {
            id = $routeParams.id
        } else {
            id = $localStorage.currentDocumentID;
        }
        /* Initial values: */
        $scope.text = $localStorage.text
        $scope.renderedText = function() { return $sce.trustAsHtml($localStorage.rendered_text); }
        $scope.docArray = $localStorage.documents

        $scope.reloadMathJax = function () { MathJax.Hub.Queue(["Typeset", MathJax.Hub]); console.log("reloadMathJax called"); }

        console.log('Document id: ' + id)

        $http.get('http://localhost:2300/v1/documents/' + id  )
        .then(function(response){
          var document = response.data['document']
          $scope.title = document['title']
          $scope.text = document['text']
          $scope.renderedText = function() { return $sce.trustAsHtml(document['rendered_text']); }

          $localStorage.currentDocumentID = document['id']
          $localStorage.title = $scope.title
          $localStorage.text = $scope.text
          $localStorage.renderedText = document['rendered_text']

        });
    }]);

    app.controller('editDocumentController', [
    '$scope',
    '$localStorage',
    '$routeParams',
    '$http',
    '$sce',
    function($scope, $localStorage, $routeParams, $http, $sce) {

        var id;
        console.log('EDIT CONTROLLER, $routeParams.id: ' + $routeParams.id)
        if ($routeParams.id != undefined) {
            id = $routeParams.id
        } else {
            id = $localStorage.currentDocumentID;
        }


        $scope.reloadMathJax = function () { MathJax.Hub.Queue(["Typeset", MathJax.Hub]); console.log("reloadMathJax called"); }
        /* Initial values: */
        $scope.title = $localStorage.title
        $scope.editableTitle = $scope.title
        $scope.text = $localStorage.text
        $scope.editText = $localStorage.text
        $scope.renderedText = function() { return $sce.trustAsHtml($localStorage.rendered_text); }
        $scope.docArray = $localStorage.documents

        /* Get most recent version from server */
        $http.get('http://localhost:2300/v1/documents/' + id  )
            .then(function(response){
                var document = response.data['document']
                $scope.title = document['title']
                $scope.editableTitle = $scope.title
                $scope.editText = document['text']
                $scope.renderedText = function() { return $sce.trustAsHtml(document['rendered_text']); }

                /* Update local storage */
                $localStorage.currentDocumentID = document['id']
                $localStorage.title = document['title']
                console.log('I set $localStorage.title to ' + $localStorage.title)
                $localStorage.text = document['text']
                $localStorage.renderedText = document['rendered_text']
            })

        /* updateDocument */
        $scope.updateDocument = function() {
            console.log('Update document ' + id + ', text = ' + $scope.editText)

            var parameter = JSON.stringify({id:id, title: $scope.editableTitle, text:$scope.editText, token: $localStorage.access_token });

            console.log('parameter:' + parameter);

            $http.post('http://localhost:2300/v1/documents/' + id, parameter)
                .then(function(response){
                    var rt;
                    if (response.data['status'] == '202') {
                        var document = response.data['document']

                        /* Update local storage */
                        $localStorage.currentDocumentID = document['id']
                        $localStorage.rendered_text = document['rendered_text']
                        $localStorage.title = document['title']

                        /* Update $scope */
                        $scope.title = document['title']
                        $scope.renderedText = function() { return $sce.trustAsHtml(document['rendered_text']); }
                        $scope.message = 'Success!'

                    } else {
                        $scope.message = response.data['error']
                    }

                    console.log('status = ' + String(response.data['status']))

                })
        }

}]);

app.controller('DocumentTypeController', function ($scope) {

    $scope.documentTypes = ['text', 'asciidoc', 'asciidoc-manuscript', 'asciiodoc-latex', 'pdf'];
});

