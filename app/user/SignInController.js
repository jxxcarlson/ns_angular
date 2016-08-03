    module.exports = function($state, $scope, $stateParams, $location, 
                               UserApiService, UserService, MathJaxService, SearchService, ImageSearchService) {
        
        
        
        if (UserService.username) {
            $scope.signinStatus = 'Signed in as ' + UserService.username()
        } else {
            $scope.signinStatus = 'No one signed'
        }
        
        $scope.submit = function() {
          UserApiService.login($scope.username, $scope.password)
          .then(
                function (result) {
                  if (UserService.loginStatus() == 200) {
                    $scope.message = 'Success!'
                    UserService.signin()
                    $scope.username = UserService.username()
                    $scope.signedIn = UserService.signedIn
                    ImageSearchService.query('scope=all')
                    SearchService.query('scope=user.' + UserService.username()).then(
                        function() {
                            $location.path('/documents')
                            // $state.reload()
                            
                            $state.transitionTo($state.current, $stateParams, { 
                              reload: true, inherit: false, notify: true
                            });
                            
                            MathJaxService.reload('SignIn')
                        })
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
