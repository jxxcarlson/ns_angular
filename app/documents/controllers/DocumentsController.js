
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
    // https://docs.angularjs.org/api/ng/service/$location
    
    // Process the given route
    if (id == undefined) { 
        console.log('1. GETTING DOCUMENT LIST')
        DocumentRouteService.getDocumentList($scope) } 
    else { 
        console.log('2. GETTING DOCUMENT, ID = ', id)
        DocumentRouteService.getDocument($scope, id)     
    } 
    
    $scope.$watch(function(scope) { 
        return scope.renderedText },
        function() { MathJax.Hub.Queue(["Typeset", MathJax.Hub]); console.log("EDIT: reloadMathJax called"); }
    );
    
}