module.exports = function($routeParams, $scope, SearchService, DocumentRouteService, DocumentService, MathJaxService) {
    

    
    var id = $routeParams.id
    console.log('Hey!, site = ' + id)
    SearchService.query('scope=user.'+id)
    
    // Process the given route
    $scope.site = id
    DocumentRouteService.getDocumentList($scope)

    
}