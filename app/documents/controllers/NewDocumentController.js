module.exports = function($scope, $location, $state, $http, $localStorage, envService, UserService, SearchService, DocumentService) {
          
    
      console.log('NEW DOCUMENT CONTROLLER')
    
      $scope.submit = function() {

      var access_token = UserService.accessToken()
      var parameter = JSON.stringify({title:$scope.title, token:access_token });

      var url = envService.read('apiUrl') + '/documents'
      if (DocumentService.subdocumentCount() > 0) {
          url += '?append=' +DocumentService.documentId()
      }
      $http.post(url, parameter)
      .then(function(response){
            if (response.data['status'] == 'success') {

                  console.log('Reponse OK, document created')
                  
                  var document = response.data['document']
                  var id = document['id']
                  $location.path('/editdocument/' + id)
                  $state.go('documents', {}, {reload:true})
                  // SearchService.query('id='+id, $scope, 'editOneDocument')

            } else {

                    console.log('BAD Reponse, document not created')
                   $scope.message = response.data['error']

            }
      });
    }
}
