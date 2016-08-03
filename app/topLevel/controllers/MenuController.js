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
    
  $scope.userDocuments = function(){

    $location.path('/documents')
                    
    SearchService.query('scope=user.' + UserService.username()).then(
                        function() {
                            $location.path('/documents')
                            $state.reload() 
                            MathJaxService.reload('user documents')
                        })
  } 
  
  
  $scope.allDocuments = function(){

    $location.path('/documents')
                    
    SearchService.query('scope=all').then(
                        function() {
                            $location.path('/documents')
                            $state.reload() 
                            MathJaxService.reload('all documents')
                        })
  }
  
  $scope.publicDocuments = function(){

    $location.path('/documents')
                    
    SearchService.query('scope=public').then(
                        function() {
                            $location.path('/documents')
                            $state.reload() 
                            MathJaxService.reload('public documents')
                        })
  }
  
  /////
  
  
  // You can pass it an object.  This hotkey will not be unbound unless manually removed
  // using the hotkeys.del() method
  hotkeys.add({
    combo: 'ctrl+e',
      description: 'Edit document',
      allowIn: ['INPUT','TEXTAREA'],
      callback: function() {
          console.log('EDIT DOCUMENT ...')
          $location.path('/editdocument')
          $state.reload()
      }
  });
    
  hotkeys.add({
    combo: 'ctrl+v',
      description: 'View docuemnt',
      allowIn: ['INPUT','TEXTAREA'],
      callback: function() {
          console.log('VIEW DOCUMENT ...')
          $location.path('/documents')
          $state.reload()
      }
  });    
    
  hotkeys.add({
    combo: 'ctrl+s',
      description: 'Save docuemnt',
      allowIn: ['INPUT','TEXTAREA'],
      callback: function() {
          console.log('SAVE DOCUMENT ...')
          console.log($scope.editText)
          // DocumentApiService.update(DocumentService.documentId(), $scope.editableTitle, $scope.editText, $scope) 
          // $location.path('/editdocument')
          // $state.reload()
      }
  });
    
  hotkeys.add({
    combo: 'ctrl+u',
      description: 'User docuemnts',
      allowIn: ['INPUT','TEXTAREA'],
      callback: function() {
        console.log('USER DOCUMENTs ...')
        $location.path('/documents')
                    
        SearchService.query('scope=user.' + UserService.username()).then(
            function() {
                $location.path('/documents')
                $state.reload() 
                MathJaxService.reload('user documents')
            })
      }
  });    
    

    
  /////
  
}