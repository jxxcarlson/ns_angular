'use strict';

var app = require('angular').module('noteshareApp');

app.controller('newDocumentController', require('./NewDocumentController'))
app.controller('documentsController', require('./DocumentsController'))
// app.controller('editDocumentController', require('./EditDocumentController'))


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

app.controller('DocumentTypeController', function ($scope) {

    $scope.documentTypes = ['text', 'asciidoc', 'asciidoc-manuscript', 'asciiodoc-latex', 'pdf'];
});