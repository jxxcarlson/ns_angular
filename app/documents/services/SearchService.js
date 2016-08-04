module.exports = function($http, $q, DocumentApiService, DocumentService, GlobalService) {
    
    var deferred = $q.defer();
    var apiServer = GlobalService.apiServer()
    
    
   
    this.query = function(searchText) {

        console.log('SearchService, query = ' + searchText)
        
        var request = 'http://' + apiServer + '/v1/documents' + '?' + searchText
        console.log('REQUEST ' + request)
        return $http.get(request)
        .then(function(response){
          console.log(response.data['status'])
          console.log('Number of documents: ' + response.data['document_count'])
          var jsonData = response.data
          var documents = jsonData['documents']
          if (documents.length == 0) {
              console.log('documents is empty, setting it to [11]')
              documents = [GlobalService.defaultDocumentID()]
          }
          
          DocumentService.setDocumentList(documents)

          var id = documents[0]['id']
          DocumentApiService.getDocument(id)
        })
        
        
    }     
}