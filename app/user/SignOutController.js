module.exports = function($scope, UserService) {

    console.log('Sign out ...')           
    $scope.signout = function() { UserService.signout(); console.log('SIGNING OUT ...') }
    
    $scope.username = UserService.username()
    $scope.signedIn = UserService.signedIn
        
}
