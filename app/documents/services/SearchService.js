module.exports = function($http, $state, $location, $q, DocumentApiService, 
                           DocumentRouteService, DocumentService, GlobalService, UserService, MathJaxService) {
    
    console.log('SEARCH SERVICE')
    
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
          console.log('Search Service, document :: ' + documents.map(function(item) { return item['id'] +', ' + item['title'] +', ' + item['author'] + ';   '}))
          if (documents.length == 0) { documents = [GlobalService.defaultDocumentID()] }
          
          DocumentService.setDocumentList(documents)

          var id = documents[0]['id']
          DocumentApiService.getDocument(id)
          DocumentApiService.getDocument(id).then(function(response) {
                  
                $state.go('documents', {}, {reload: true})
              
              }) 
         })
    }
}