module.exports = function($scope, $state, $stateParams, UserService, DocumentService) {

    console.log('Sign out ...')
    
    $scope.signout = function() { 
        UserService.signout() 
        DocumentService.clear()
        $state.transitionTo($state.current, $stateParams, {reload: true, inherit: false, notify: true });
        console.log('SIGNING OUT ...') 
    }
    
    $scope.username = UserService.username()
    $scope.signedIn = UserService.signedIn
    
      
        
}
