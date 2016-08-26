module.exports = function ($state, $scope,$window, $timeout, $q, $stateParams, $location, $window,
                           UserApiService, UserService, DocumentService, MathJaxService,
                           SearchService) {


    var deferred = $q.defer();
    $scope.message = ""

    if (UserService.username) {
        $scope.signinStatus = 'Signed in as ' + UserService.username()
    } else {
        $scope.signinStatus = 'No one signed in'
    }

    $scope.submit = function () {
        UserApiService.login($scope.username, $scope.password)
            .then(
                function (result) {
                    if (UserService.loginStatus() == 200) {
                        console.log('SIGNING IN USER')
                        $scope.message = 'Success!'
                        UserService.signin($scope)
                        // ImageSearchService.query('scope=all', $state)
                        SearchService.query('user=' + UserService.username(), $scope, 'documents').then(
                            function () {
                                // $window.location.reload()
                                $state.go('documents', {}, {reload: true})
                                MathJaxService.reload(DocumentService.kind(), 'MMM, SignIn')

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
            ).then(

                function(response) {

                    deferred.resolve(response)

                    $timeout(
                        function() {

                            console.log('I am a satisfied with your sign in process')
                            $window.location.reload()

                        },
                        500
                    )


                }
        )
    }
}
