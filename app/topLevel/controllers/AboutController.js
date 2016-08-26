
module.exports = function($scope, foo, envService) {


    $scope.message = 'Look! I am an about page ....';
    foo.myFunc('AboutController')

    $scope.clientUrl = envService.read('clientUrl')
    $scope.apiUrl = envService.read('apiUrl')

}

