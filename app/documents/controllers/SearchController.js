module.exports = function($scope, $route, $location, $http, DocumentService, DocumentApiService) {
        $scope.doSearch = function(){
            console.log('Search text: ' + $scope.searchText);
            $http.get('http://localhost:2300/v1/documents' + '?scope=' + $scope.searchText  )
            .then(function(response){
              console.log(response.data['status'])
              console.log('Number of documents: ' + response.data['document_count'])
              var jsonData = response.data
              var documents = jsonData['documents']
              DocumentService.setDocumentList(documents)
              
              var id = documents[0]['id']
              DocumentApiService.getDocument(id)
              .then(function(response) {
                $location.path('/documents')
                $route.reload()       
              }) 
            });

      };
    }