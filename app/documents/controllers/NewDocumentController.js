module.exports = function($scope, $location, $state, $http, $localStorage, envService, UserService, SearchService) {
          
    
      console.log('NEW DOCUMENT CONTROLLER')
    
      $scope.submit = function() {

      var access_token = UserService.accessToken()
      var parameter = JSON.stringify({title:$scope.title, token:access_token });

      $http.post(envService.read('apiUrl') + '/documents', parameter)
      .then(function(response){
            if (response.data['status'] == 202) {

                  console.log('Reponse OK, document created')
                  
                  var document = response.data['document']
                  var id = document['id']
                  $location.path('/editdocument/' + id)
                  SearchService.query('id='+id, $scope, 'editOneDocument')

            } else {

                    console.log('BAD Reponse, document not created')
                   $scope.message = response.data['error']

            }
      });
    }
}
