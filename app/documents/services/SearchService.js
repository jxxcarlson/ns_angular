module.exports = function($http, DocumentApiService, DocumentService) {
   
    this.find = function(searchText) {

        $http.get('http://localhost:2300/v1/documents' + '?' + searchText  )
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