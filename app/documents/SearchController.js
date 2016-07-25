module.exports = function($scope, $http, DocumentService) {
        $scope.doSearch = function(){
            console.log('Search text: ' + $scope.searchText);
            $http.get('http://localhost:2300/v1/documents' + '?' + $scope.searchText  )
            .then(function(response){
              console.log(response.data['status'])
              console.log('Number of documents: ' + response.data['document_count'])
              var jsonData = response.data
              var documents = jsonData['documents']
              DocumentService.setDocumentList(documents)
            });

      };
    }