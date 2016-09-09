module.exports = function($scope, $state, $stateParams, UserService, DocumentService, $localStorage) {

    console.log('Sign out ...')
    
    $scope.signout = function() { 
        UserService.signout() 
        DocumentService.clear()
        $localStorage.$reset();
        $state.transitionTo($state.current, $stateParams, {reload: true, inherit: false, notify: true });
        console.log('SIGNING OUT ...') 
    }
    
    $scope.username = UserService.username()
    $scope.signedIn = UserService.signedIn
    
      
        
}
