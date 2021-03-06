module.exports = function($stateParams, $state, $scope, $location, SearchService, DocumentService, DocumentApiService, UserService) {
    
    console.log('SITE CONTROLLER')
    
    var segment1 = $location.absUrl().split('/')[3]
    var id = $stateParams.id
    
    console.log('segment1: ' + segment1)
    console.log('Hey!, site = ' + id)
    console.log('SiteController, QS = ' + JSON.stringify($location.search()))
   
    UserService.setCurrentSite(id)
    
    if (segment1 == 'user') {
        
        var queryString = 'user=' + id
        
    } else {
        
        var queryString = 'user.public=' + id
    }
    SearchService.query(queryString, $scope, 'documents')
    .then(function(response){
        $scope.site = id
        DocumentApiService.getDocumentList($scope)
        $scope.docStyle = function(doc) {
            if (doc['id'] == DocumentService.document().id) { return { "background-color" : "#fee" }}
        }
    }).then(function(result){
        if (segment1 == 'user') {
        
        $state.go('documents')
        
    } else {
        
        $state.go('site')
    }
        
       
    })       
}