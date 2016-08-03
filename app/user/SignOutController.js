module.exports = function($scope, $state, $stateParams, UserService) {

    console.log('Sign out ...')
    
    $scope.signout = function() { 
        UserService.signout(); 
        $state.transitionTo($state.current, $stateParams, {reload: true, inherit: false, notify: true });
        console.log('SIGNING OUT ...') 
    }
    
    $scope.username = UserService.username()
    $scope.signedIn = UserService.signedIn
    
      
        
}
