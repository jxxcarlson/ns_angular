
// ROUTES PROCESSED:
// GET /documents
// GET /documents/:id

REFERENCE: https://github.com/gsklee/ngStorage

module.exports = function($scope, $window, $location, $stateParams, $state, $sce, DocumentApiService, 
                           DocumentService, DocumentRouteService, UserService, MathJaxService ) {

 
    var id = $stateParams.id;
    var queryString =  $location.search()
    
    var innerHeight = $window.innerHeight
    document.getElementById("rendered-text").style.height = (innerHeight - 220) + 'px'
    
    // Process the given route
    if (id == undefined) { 
        DocumentRouteService.getDocumentList($scope) }
        //documentKind = DocumentService.kind()
        
    else { 
        DocumentRouteService.getDocument($scope, id)     
        // documentKind = DocumentService.kind()
    } 
    var documentKind = DocumentService.kind()
    
    
    $scope.docStyle = DocumentService.tocStyle
    
    $scope.author = function(doc) {
        
        console.log(doc)
        if (doc['author'] != UserService.username()) {
            
            return doc['author'] + ": "
            
        } else {
            
            return ""
        }
        
        
    }
    
    if (DocumentService.getPublic()) {
            $scope.statusPublic = 'public'
        } else {
            $scope.statusPublic = 'private'
        }

    
    $scope.$watch(function(scope) { 
        return $scope.renderedText },
        MathJaxService.reload('DocumentController')              
    );

}