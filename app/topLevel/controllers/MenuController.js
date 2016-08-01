module.exports = function ($scope, $log, $location, $route, UserService, SearchService) {
  $scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

  $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
    
  $scope.userDocuments = function(){

    console.log('KKKK: ' + UserService.username())
    
    SearchService.query('scope=user.' + UserService.username())
    $location.path('/documents')
    $route.reload()     
  }    
}