module.exports = function($http, $state, $location, $q, DocumentApiService, 
                           DocumentRouteService, DocumentService, GlobalService, UserService) {
    
    var deferred = $q.defer();
    var apiServer = GlobalService.apiServer() 
   
    this.query = function(searchText, scope, destination='documents') {
        
        if (UserService.accessTokenValid() == false) {
                
                searchText += '&public'
                
            }
        
         return $http.get('http://' + apiServer + '/v1/documents' + '?' + searchText  )
        .then(function(response){
              
          var jsonData = response.data
          var documents = jsonData['documents']
          
          if (documents.length == 0) { documents = [GlobalService.defaultDocumentID()] }
          
          DocumentService.setDocumentList(documents)

          var id = documents[0]['id']
          DocumentApiService.getDocument(id)
          // DocumentRouteService.getDocument(id, scope)
          
        }).then(function(response) { 
             
             $state.go(destination, {}, {reload: true}) })
    }     
}