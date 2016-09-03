module.exports = function ($scope, $rootScope, $log, $location, $state, 
                            UserService, SearchService,
                            DocumentApiService, DocumentService, PermissionService, hotkeys) {
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
    
  $scope.userDocuments = function(){ SearchService.query('user=' + UserService.username(), $scope, 'documents') }
  
  $scope.allDocuments = function(){ SearchService.query('scope=all', $scope, 'documents') }

  $scope.randomDocuments = function(){ SearchService.query('random=50', $scope, 'documents') }

  $scope.publicDocuments = function(){ SearchService.query('scope=public', $scope, 'documents') }


  $scope.doEditDocument = function() {

    if (PermissionService.canEdit()) { $state.go('editdocument') }

  }
  
  /////
  //$scope.$on('someEvent', function(event, data) { console.log('WWW' + data); });
  
  // You can pass it an object.  This hotkey will not be unbound unless manually removed
  // using the hotkeys.del() method
  hotkeys.add({
    combo: 'ctrl+e',
      description: 'Edit document',
      allowIn: ['INPUT','TEXTAREA'],
      callback: function() {

        console.log('*** author name = '  + DocumentService.document().author_name)
        console.log('*** title = '  + DocumentService.document().title)
        console.log('*** owner_id = '  + DocumentService.document().owner_id)
        console.log('*** user name = '  +  UserService.username())
        console.log('*** user id = '  +  UserService.username())

        if (PermissionService.canEdit()) { $state.go('editdocument') }
    }
  });
    
  hotkeys.add({
    combo: 'ctrl+v',
      description: 'View docuemnt',
      allowIn: ['INPUT','TEXTAREA'],
      callback: function() { $state.go('documents') }
  });    

  hotkeys.add({
    combo: 'ctrl+u',
      description: 'User documents',
      allowIn: ['INPUT','TEXTAREA'],
      callback: function() {
        console.log('USER DOCUMENTs ...')            
        SearchService.query('user=' + UserService.username(), $scope)
      }
  });    
    

    
  /////
  
}