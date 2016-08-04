

module.exports = function($scope, $localStorage, UserApiService, UserService) {
        
        $scope.submit = function() {
          UserApiService.newUser($scope.username, $scope.email, $scope.password)
          .then(
                function (result) {
                  if (UserService.loginStatus() == 200) {
                    $scope.message = 'Success!'
                  } else {
                    $scope.message = 'Sorry'
                  }
                    // promise was fullfilled (regardless of outcome)
                    // checks for information will be peformed here
                },
                function (error) {
                    // handle errors here
                    // console.log(error.statusText);
                    console.log('ERROR!');
                }
            );
        }
      }
    
    