

module.exports = function($scope, $localStorage, $state, SearchService, UserApiService, UserService) {
    
    $scope.message = ""
      

    $scope.submit = function() {
      UserApiService.newUser($scope.username, $scope.email, $scope.password)
      .then(
            function (result) {
              if (UserService.loginStatus() == 'success') {
                $scope.message = 'Success: signed in as ' + $scope.username
                SearchService.query("user="+$scope.username)
                $state.go('documents', {}, {reload: true})
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
    
    