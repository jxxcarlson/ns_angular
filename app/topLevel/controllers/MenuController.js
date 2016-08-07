module.exports = function ($scope, $rootScope, $log, $location, $state, 
                            UserService, MathJaxService, SearchService,
                            DocumentApiService, DocumentService, hotkeys) {
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
    
  $scope.userDocuments = function(){ SearchService.query('user=' + UserService.username(), $scope) } 
  
  $scope.allDocuments = function(){ SearchService.query('scope=all'), $scope }
  
  $scope.publicDocuments = function(){ SearchService.query('scope=public'), $scope }
  
  /////
  
  
  // You can pass it an object.  This hotkey will not be unbound unless manually removed
  // using the hotkeys.del() method
  hotkeys.add({
    combo: 'ctrl+e',
      description: 'Edit document',
      allowIn: ['INPUT','TEXTAREA'],
      callback: function() { $state.go('editdocument') }
  });
    
  hotkeys.add({
    combo: 'ctrl+v',
      description: 'View docuemnt',
      allowIn: ['INPUT','TEXTAREA'],
      callback: function() { $state.go('documents') }
  });    
    
  hotkeys.add({
    combo: 'ctrl+s',
      description: 'Save docuemnt',
      allowIn: ['INPUT','TEXTAREA'],
      callback: function() {
          $state.go('editdocument')
          console.log('SAVE DOCUMENT ' + $scope.editableTitle )
          // console.log($scope.editText)
          DocumentApiService.update(DocumentService.params($scope), $scope)
          
      }
  });
    
  hotkeys.add({
    combo: 'ctrl+u',
      description: 'User docuemnts',
      allowIn: ['INPUT','TEXTAREA'],
      callback: function() {
        console.log('USER DOCUMENTs ...')            
        SearchService.query('user=' + UserService.username(), $scope)
      }
  });    
    

    
  /////
  
}