    module.exports = function($scope, $localStorage, UserApiService) {
        
        $scope.submit = function() {
          UserApiService.login($scope.username, $scope.password)
          .then(
                function (result) {
                  if ($localStorage.loginStatus == 200) {
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
