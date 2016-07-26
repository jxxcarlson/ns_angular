module.exports = function($scope, $route, UserService) {

    console.log('Sign out ...')
    
    $scope.signout = function() { UserService.signout(); $route.reload(); console.log('SIGNING OUT ...') }
    
    $scope.username = UserService.username()
    $scope.signedIn = UserService.signedIn
    
      
        
}
