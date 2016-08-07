module.exports = function($http, $state, $location, $q, DocumentApiService, DocumentService, GlobalService, UserService) {
    
    var deferred = $q.defer();
    var apiServer = GlobalService.apiServer() 
   
    this.query = function(searchText, scope, destination='documents') {
        
         return $http.get('http://' + apiServer + '/v1/documents' + '?' + searchText  )
        .then(function(response){
              
          var jsonData = response.data
          var documents = jsonData['documents']
          
          if (documents.length == 0) { documents = [GlobalService.defaultDocumentID()] }
          
          DocumentService.setDocumentList(documents)

          var id = documents[0]['id']
          DocumentApiService.getDocument(id)
          
        }).then(function(response) { 
             
             $state.go(destination, {}, {reload: true}) })
    }     
}