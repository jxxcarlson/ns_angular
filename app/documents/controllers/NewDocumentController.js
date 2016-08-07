module.exports = function($scope, $location, $state, $http, $localStorage, GlobalService, UserService, SearchService) {
          
    
      console.log('NEW DOCUMENT CONTROLLER')
      var apiServer = GlobalService.apiServer()

      $scope.submit = function() {

      var access_token = UserService.accessToken()
      var parameter = JSON.stringify({title:$scope.title, token:access_token });

      $http.post('http://' + apiServer + '/v1/documents', parameter)
      .then(function(response){
            if (response.data['status'] == 202) {

                  console.log('Reponse OK, document created')
                  
                  var document = response.data['document']
                  var id = document['id']
                  $location.path('/editdocument/' + id)
                  SearchService.query('title='+$scope.title, $scope, 'editOneDocument')

            } else {

                    console.log('BAD Reponse, document not created')
                   $scope.message = response.data['error']

            }
      });
    }
}
