module.exports = function($http, $state, $location, $q, DocumentApiService, 
                           DocumentRouteService, DocumentService, envService, UserService, MathJaxService) {
    
    console.log('SEARCH SERVICE')
    
    var deferred = $q.defer();
   
    this.query = function(searchText, scope, destination='documents') {
        
        if (UserService.accessTokenValid() == false) {
                
                searchText += '&public'
                
            }
        
         var url = envService.read('apiUrl') + '/documents' + '?' + searchText
         var options = { headers: { "accesstoken": UserService.accessToken() }}
         return $http.get(url, options)
        .then(function(response){
              
          var jsonData = response.data
          var documents = jsonData['documents']
          
          scope.tableOfContentsTitle = 'Search results (' + DocumentService.documentCount() + ')
 
          DocumentService.setDocumentList(documents)

          var id = documents[0]['id']
          DocumentApiService.getDocument(id)
          DocumentApiService.getDocument(id).then(function(response) {
                  
                $state.go(destination, {}, {reload: true})
              
              }) 
         })
    }
}