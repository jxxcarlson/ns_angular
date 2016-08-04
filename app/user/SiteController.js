module.exports = function($stateParams, $state, $scope, $location, SearchService, DocumentRouteService, DocumentService, MathJaxService) {
    
    console.log('SITE CONTROLLER')
    
   
    var id = $stateParams.id
    console.log('Hey!, site = ' + id)
    SearchService.query('scope=user.'+id)
    
    $scope.site = id
    DocumentRouteService.getDocumentList($scope)
    
    
    
}