module.exports = function($http, $q, DocumentApiService, DocumentService) {
    
    var deferred = $q.defer();
    
    
   
    this.query = function(searchText) {

        console.log('SearchService, query = ' + searchText)
        
        var request = 'http://localhost:2300/v1/documents' + '?' + searchText
        console.log('REQUEST ' + request)
        return $http.get(request)
        .then(function(response){
          console.log(response.data['status'])
          console.log('Number of documents: ' + response.data['document_count'])
          var jsonData = response.data
          var documents = jsonData['documents']
          DocumentService.setDocumentList(documents)

          var id = documents[0]['id']
          DocumentApiService.getDocument(id)
        })
        
        
    }     
}