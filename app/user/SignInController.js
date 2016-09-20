module.exports = function ($state, $scope, $window, $timeout, $q, $stateParams, $location, $localStorage,
                           UserApiService, UserService, DocumentService, MathJaxService,
                           SearchService) {


    var deferred = $q.defer();
    $scope.message = ""

    if (UserService.username) {
        $scope.signinStatus = 'Signed in as ' + UserService.username()
    } else {
        $scope.signinStatus = 'No one signed in'
    }


    MathJax.Hub.Queue(["Typeset", MathJax.Hub])


    $scope.submit = function () {

        UserApiService.login($scope.username, $scope.password)
            .then(
                function (result) {
                    if (UserService.loginStatus() == 200) {
                        $scope.message = 'Success!'
                        UserService.signin($scope)
                        SearchService.query('user=' + UserService.username(), $scope, 'documents').then(
                            function () {
                                $state.go('documents', {}, {reload: true})
                            })
                    } else {
                        UserService.signout()
                        $localStorage.$reset()
                        $scope.message = "Sorry - no account or username and password don't match"
                    }
                },
                function (error) {
                    console.log('ERROR!');
                }
            ).then(
            function (response) {

                deferred.resolve(response)

                $timeout(
                    function () {

                        console.log('I am a satisfied with your sign in process')
                        $window.location.reload()

                    },
                    500
                )
            }
        )
    }
}
