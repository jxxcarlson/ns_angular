module.exports = function($scope, $route, $location, $http, DocumentService, DocumentApiService) {
        $scope.doSearch = function(){
            console.log('Search text: ' + $scope.searchText);
            
            $http.get('http://localhost:2300/v1/documents' + '?' + $scope.searchText  )
            .then(function(response){
              console.log(response.data['status'])
              console.log('Number of documents: ' + response.data['document_count'])
              var jsonData = response.data
              var documents = jsonData['documents']
              DocumentService.setDocumentList(documents)
              
              var id = documents[0]['id']
              DocumentApiService.getDocument(id)
              .then(function(response) {
                
                
                // XX: THIS IS NEEDED (RE reloadMathJax here)
                $scope.$watch(function(scope) { 
                    return $scope.renderedText },
                    function() { MathJax.Hub.Queue(["Typeset", MathJax.Hub]); console.log("EDIT: reloadMathJax called"); }
                );
                  
                $location.path('/documents')
                $route.reload()
                
              }) 
            });

      };
    }                                      