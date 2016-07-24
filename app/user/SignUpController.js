

module.exports = [
      '$scope',
      '$http',
      '$localStorage',
      'UserService',
      function($scope, $http, $localStorage, UserService) {
          
        $scope.submit = function() {
            
          var validation = UserService.validateNewUser($scope.username, $scope.email, $scope.password, $scope.passwordConfirmation)
          console.log('validaion: ' + validation)
          
          if (validation != 'OK') 
              { $scope.message = validation
                console.log('Password and confirmation do not match')
              }
            else {
                
                console.log('Password and confirmation match')    
                var parameter = JSON.stringify({username:$scope.username, email:$scope.email, 
                                        password: $scope.password, password_confirmation: $scope.passwordConfirmation});




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
        
                
            } // else
        } // $scope.submit
      } // function
    ]