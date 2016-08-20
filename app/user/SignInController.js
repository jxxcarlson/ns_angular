    module.exports = function($state, $scope, $stateParams, $location, 
                               UserApiService, UserService, DocumentService, MathJaxService, 
                               SearchService, ImageSearchService) {
        
        
        $scope.message = ""
        
        if (UserService.username) {
            $scope.signinStatus = 'Signed in as ' + UserService.username()
        } else {
            $scope.signinStatus = 'No one signed in'
        }
        
        $scope.submit = function() {
          UserApiService.login($scope.username, $scope.password)
          .then(
                function (result) {
                  if (UserService.loginStatus() == 200) {
                    console.log('SIGNING IN USER')  
                    $scope.message = 'Success!'
                    UserService.signin($scope)
                    // ImageSearchService.query('scope=all', $state)
                    SearchService.query('user=' + UserService.username(), $scope, 'documents').then(
                        function() {
                            $state.go('documents', {}, {reload:true})
                            MathJaxService.reload(DocumentService.kind(), 'SignIn')
                        })
                  } else {
                    console.log('CANNOT SIGN IN USER')  
                    UserService.signout()
                    console.log('--------')
                    DocumentService.clear() 
                    $scope.message = "Sorry - no account or username and password don't match"
                  }
                    // promise was fullfilled (regardless of outcome)
                    // checks for information will be peformed here
                },
                function (error) {
                    console.log('ERROR!');
                }
            );
        }
      }
