module.exports = function($scope, UserService) {
       
    $scope.username = UserService.username()
    
    if ((UserService.username() == undefined) || (UserService.username() == '')){
        $scope.userStatus = 'signedOut'  
    } else {
        $scope.userStatus = 'signedIn' 
    }
            
}
