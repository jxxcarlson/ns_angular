module.exports = function($scope, $state, $http, envService,
                           DocumentService, DocumentApiService, 
                           MathJaxService, QueryParser, UserService) {
        $scope.doSearch = function(){
            
            var query = QueryParser.parse($scope.searchText)
            
            if (UserService.accessTokenValid() == false) {
                
                query += '&public'
                
            }
            
            $http.get(envService.read('apiUrl') + '/documents' + '?' + query, {
                 headers: { "accesstoken": UserService.accessToken() }
             }  )
            .then(function(response){
                              
              var jsonData = response.data
              var documents = jsonData['documents']
              
              DocumentService.setDocumentList(documents)
                
              var id = documents[0]['id']
              
              var doc= documents[0]
              if (doc) {
                var id = documents[0]['id']
                DocumentApiService.getDocument(id).then(function(response) {
                  
                $state.go('documents', {}, {reload: true})
                
                $scope.$watch(function(scope) { 
                    return $scope.renderedText },
                    MathJaxService.reload(DocumentService.kind(), 'SearchController')              
                );                
              })  
              }
              
              
            });
      };
    }                                      