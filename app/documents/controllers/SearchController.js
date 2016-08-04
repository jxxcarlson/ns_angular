module.exports = function($scope, $state, $location, $http, GlobalService,
                           DocumentService, DocumentApiService, MathJaxService, QueryParser) {
        $scope.doSearch = function(){
            
            var apiServer = GlobalService.apiServer()
            var query = QueryParser.parse($scope.searchText)
            console.log('query = ' + query)
            
            $http.get('http://' + apiServer + '/v1/documents' + '?' + query  )
            .then(function(response){
              console.log(response.data['status'])
              console.log('Number of documents: ' + response.data['document_count'])
              var jsonData = response.data
              var documents = jsonData['documents']
              DocumentService.setDocumentList(documents)
              
              var id = documents[0]['id']
              console.log('SearchController, id: ' + id)
              DocumentApiService.getDocument(id)
              .then(function(response) {
                
                
                // XX: THIS IS NEEDED (RE reloadMathJax here)
                $scope.$watch(function(scope) { 
                    return $scope.renderedText },
                    // function() { MathJax.Hub.Queue(["Typeset", MathJax.Hub]); console.log("EDIT: reloadMathJax called"); }
                    MathJaxService.reload('SearchController')              
                );
                  
                $location.path('/documents')
                $state.reload()
                
              }) 
            });

      };
    }                                      