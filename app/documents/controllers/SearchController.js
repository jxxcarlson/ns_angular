module.exports = function($scope, $state, $http, GlobalService,
                           DocumentService, DocumentApiService, 
                           MathJaxService, QueryParser) {
        $scope.doSearch = function(){
            
            var apiServer = GlobalService.apiServer()
            var query = QueryParser.parse($scope.searchText)
            
            $http.get('http://' + apiServer + '/v1/documents' + '?' + query  )
            .then(function(response){
                              
              var jsonData = response.data
              var documents = jsonData['documents']
              
              DocumentService.setDocumentList(documents)
              
              var id = documents[0]['id']
              DocumentApiService.getDocument(id).then(function(response) {
                  
                $state.go('documents', {}, {reload: true})
                
                $scope.$watch(function(scope) { 
                    return $scope.renderedText },
                    MathJaxService.reload('SearchController')              
                );                
              })
              
            });
      };
    }                                      