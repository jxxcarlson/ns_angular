
/*
GET /documents
GET /documents/:id

REFERENCE: https://github.com/gsklee/ngStorage

For example, URL’s like /route/12345?a=2&b=3 will match the route /route
with id 12345 and query string variables a & b. Now those values can
be accessed in controller code using $routeParams service. Any parameter
[preceded by ':'] in route can be accessed in controller by it’s name
using $routeParams.paramName. Additionally, any query string passed
in URL can be accessed in controller using $routeParams.variableName
*/
module.exports = function($scope, $routeParams, $sce, DocumentApiService, DocumentService) {

    console.log('DocumentsController, $routeParams.id = ' + $routeParams.id)
    var id;
    if ($routeParams.id == undefined) { // Request was GET /documents
        id = DocumentService.documentId()
        console.log('(1) Document id: ' + id)
        $scope.title = DocumentService.title()
        $scope.text = DocumentService.text()
        $scope.renderedText = function() { return $sce.trustAsHtml(DocumentService.renderedText()); }
        $scope.docArray = DocumentService.documentList()
        $scope.documentCount = DocumentService.documentCount()
        
        $scope.$watch(function(scope) { 
            return scope.renderedText },
            function() { MathJax.Hub.Queue(["Typeset", MathJax.Hub]); console.log("EDIT: reloadMathJax called"); }
        );
        
        console.log('XX. Number of documents: ' + DocumentService.documentCount())
        
    } else { // Request was GET /documents/:id
        
        console.log('II, DocumentsController, $routeParams.id = ' + $routeParams.id)
        
        id = $routeParams.id
        console.log('II. Document id: ' + id)
        DocumentApiService.getDocument(id)
        .then(
            function (response) {
                $scope.title = DocumentService.title()
                $scope.text = DocumentService.text()
                $scope.renderedText = function() { return $sce.trustAsHtml(DocumentService.renderedText()); }
                $scope.docArray = DocumentService.documentList()
                $scope.numberOfDocuments = DocumentService.documentCount()
                
                $scope.$watch(function(scope) { 
                    return scope.renderedText },
                    function() { MathJax.Hub.Queue(["Typeset", MathJax.Hub]); console.log("EDIT: reloadMathJax called"); }
                );
            },
            function (error) {
                // handle errors here
                // console.log(error.statusText);
                console.log('ERROR!');
            }
        );
        
    } // else 
}