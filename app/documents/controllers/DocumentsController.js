
// ROUTES PROCESSED:
// GET /documents
// GET /documents/:id

REFERENCE: https://github.com/gsklee/ngStorage

module.exports = function($scope, $location, $routeParams, $sce, DocumentApiService, 
                           DocumentService, DocumentRouteService, MathJaxService) {

 
    var id = $routeParams.id;
    var queryString =  $location.search()
    
    // Process the given route
    if (id == undefined) { 
        DocumentRouteService.getDocumentList($scope) }
        //documentKind = DocumentService.kind()
        
    else { 
        DocumentRouteService.getDocument($scope, id)     
        // documentKind = DocumentService.kind()
    } 
    var documentKind = DocumentService.kind()
    
    
    $scope.docStyle = function(doc) {
        if (doc['id'] == DocumentService.documentId() ) {
            return { "background-color" : "#fee" }
        }
    }
    
    $scope.$watch(function(scope) { 
        return $scope.renderedText },
        MathJaxService.reload('DocumentController')              
    );

}