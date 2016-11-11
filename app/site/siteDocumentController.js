module.exports = function($stateParams, $state, $scope, $location, DocumentService) {
    
    console.log('SITE DOCUMENT CONTROLLER')
    
   
    $scope.site = $stateParams.site
    var doc_id = $stateParams.doc_id
    
    var queryObj =  $location.search()
    
    DocumentApiService.getDocumentList($scope)
    DocumentApiService.getDocument($scope, doc_id, queryObj)
    
    $scope.docStyle = function(doc) {
        if (doc['id'] == DocumentService.document().id ) {
            return { "background-color" : "#fee" }
        }
    }
    
}