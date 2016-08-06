
// ROUTES PROCESSED:
// GET /documents
// GET /documents/:id

REFERENCE: https://github.com/gsklee/ngStorage

module.exports = function($scope, $window, $location, $stateParams, $state, $sce, DocumentApiService, 
                           DocumentService, DocumentRouteService, MathJaxService ) {

 
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
    
    
    $scope.docStyle = function(doc) { 
        var css = {}
        if (doc['id'] == DocumentService.documentId() ) {
            css["background-color"] = "#fee"
        }
        if (doc['public'] == true ) {
            css["font-style"] = "italic"
        }
        return css
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