module.exports = function($scope, $location, $state, $http, $localStorage, envService, UserService, SearchService, DocumentService) {
          
    
      console.log('NEW DOCUMENT CONTROLLER')
    
      $scope.submit = function() {

      var access_token = UserService.accessToken()
      var parameter = JSON.stringify({title:$scope.title, token:access_token });
      var url = envService.read('apiUrl') + '/documents'
      var hasSubdocuments = (DocumentService.subdocumentCount() > 0)
      var lastDocumentId = DocumentService.documentId()
      
      // Add the newly created document to the document list
      // of the current document
      if (hasSubdocuments) {
          url += '?append=' +DocumentService.documentId()
      }
        
      // Create document      
      $http.post(url, parameter)
      .then(function(response){
            if (response.data['status'] == 'success') {

                  console.log('Reponse OK, document created')
                  
                  var document = response.data['document']
                  var id = document['id']
                  
                  
                  if (hasSubdocuments == true) { 
                      console.log('BRANCH A')
                      console.log('**** lastDocumentId: '+ lastDocumentId)
                      SearchService.query('id='+lastDocumentId, $scope)
                      
                      // $location.path('/editdocument/' + id)
                      // $state.go('editdocument', {}, {reload:true})
                      
                  } else {
                      console.log('BRANCH B')
                      $location.path('/editdocument/' + id)
                      $state.go('editdocument', {}, {reload:true})
                  }
                  
                  // SearchService.query('id='+id, $scope, 'editOneDocument')

            } else {

                    console.log('BAD Reponse, document not created')
                   $scope.message = response.data['error']

            }
      });
    }
}
