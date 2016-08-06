module.exports = function($stateParams, $state, $scope, $location, SearchService, DocumentRouteService, DocumentService, MathJaxService, UserService) {
    
    console.log('SITE CONTROLLER')
    
   
    var id = $stateParams.id
    UserService.setCurrentSite(id)
    console.log('Hey!, site = ' + id)
    SearchService.query('user.public='+id)
    .then(function(response){
        $scope.site = id
        DocumentRouteService.getDocumentList($scope)
        $scope.docStyle = function(doc) {
            if (doc['id'] == DocumentService.documentId()) { return { "background-color" : "#fee" }}
        }
    }).then(function(result){
        $state.go('site')
    })       
}