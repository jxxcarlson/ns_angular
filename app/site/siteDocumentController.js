module.exports = function($stateParams, $state, $scope, $location, DocumentService, DocumentRouteService) {
    
    console.log('SITE DOCUMENT CONTROLLER')
    
   
    $scope.site = $stateParams.site
    var doc_id = $stateParams.doc_id
    
    var queryObj =  $location.search()
    
    DocumentRouteService.getDocumentList($scope)
    DocumentRouteService.getDocument($scope, doc_id, queryObj)
    
    $scope.docStyle = function(doc) {
        if (doc['id'] == DocumentService.documentId() ) {
            return { "background-color" : "#fee" }
        }
    }
    
}