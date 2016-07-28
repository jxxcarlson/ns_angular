
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


module.exports = function($scope, $location, $routeParams, $sce, DocumentApiService, DocumentService, DocumentRouteService) {

    console.log('DocumentsController, $routeParams.id = ' + $routeParams.id)
    console.log('DocumentsController, search = ' + $routeParams.search)
    console.log('DocumentsController, URL = ' + $location.absUrl())
    console.log('DocumentsController, QS = ' + JSON.stringify($location.search()))
    
    var id = $routeParams.id;
    var queryString =  $location.search()
    // var documentKind;
    // https://docs.angularjs.org/api/ng/service/$location
    
    // Process the given route
    if (id == undefined) { 
        console.log('1. GETTING DOCUMENT LIST')
        DocumentRouteService.getDocumentList($scope) }
        //documentKind = DocumentService.kind()
        
    else { 
        console.log('2. GETTING DOCUMENT, ID = ', id)
        DocumentRouteService.getDocument($scope, id)     
        // documentKind = DocumentService.kind()
    } 
    var documentKind = DocumentService.kind()
    
    
    $scope.docStyle = function(doc) {
        if (doc['id'] == DocumentService.documentId() ) {
        // if (doc['id'] == 11 ) {
        // if (true ) {
            return { "background-color" : "#fee" }
        }
    }
    
    $scope.$watch(function(scope) { 
        return scope.renderedText },
        // DocumentService.reloadMathJax(documentKind)         
        function() { MathJax.Hub.Queue(["Typeset", MathJax.Hub]); console.log("DOC CONTROLLER: reloadMathJax called"); }
    );
    
}