module.exports = function($scope, $location, $state, $http, $localStorage, GlobalService, UserService, SearchService) {
          
  var apiServer = GlobalService.apiServer()

  $scope.submit = function() {

  var access_token = UserService.accessToken()
  var parameter = JSON.stringify({title:$scope.title, token:access_token });

  $http.post('http://' + apiServer + '/v1/documents', parameter)
  .then(function(response){
    if (response.data['status'] == 202) {

      $scope.message = 'Success!'
      var document = response.data['document']
      var id = document['id']

    } else {

      $scope.message = response.data['error']

    }

    $location.path('/editdocument/' + id)
    SearchService.query('title='+$scope.title, 'editOneDocument')

  });


}
}
