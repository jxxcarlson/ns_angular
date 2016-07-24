module.exports = [
      '$scope',
      '$http',
      '$localStorage',
      function($scope, $http, $localStorage) {
        $scope.submit = function() {
          var parameter = JSON.stringify({username:$scope.username, email:$scope.email, password: $scope.password, password_confirmation: $scope.passwordConfirmation});
          console.log(parameter);

          $http.post('http://localhost:2300/v1/users/create', parameter)
          .then(function(response){
            if (response.data['status'] == 200) {
              $scope.message = 'Success!'
              $localStorage.access_token = response.data['token']
            } else {
              $scope.message = response.data['error']
            }
            console.log('status = ' + String(response.data['status']))
          });


        }
      }
    ]