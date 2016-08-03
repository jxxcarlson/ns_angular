module.exports = function($stateParams, $scope, SearchService, DocumentRouteService, DocumentService, MathJaxService) {
    

    
    var id = $stateParams.id
    console.log('Hey!, site = ' + id)
    SearchService.query('scope=user.'+id)
    
    // Process the given route
    $scope.site = id
    DocumentRouteService.getDocumentList($scope)

    
}