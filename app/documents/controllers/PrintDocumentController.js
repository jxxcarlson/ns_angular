module.exports = function($scope, $stateParams, $state, $sce, DocumentApiService,
                          DocumentService ) {

    console.log('PP: controller PrintDocument')

    var id = DocumentService.currentDocumentItem().id


    console.log('  -- PP: id =' + id)


    DocumentApiService.printDocument($scope, id, {})

    // $scope.title = DocumentService.title()
    // $scope.printUrl = DocumentService.printUrl()
    console.log('PRINT controller: printUrl = ' +  $scope.printUrl )

    $state.go('printdocument')

}