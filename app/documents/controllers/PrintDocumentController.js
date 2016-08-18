module.exports = function($scope, $stateParams, $state, $sce, DocumentApiService,
                          DocumentService, DocumentRouteService ) {

    console.log('PP: controller PrintDocument')

    var id = DocumentService.currentDocumentItem().id


    console.log('  -- PP: id =' + id)


    DocumentRouteService.printDocument($scope, id, {})

    $scope.title = DocumentService.title()
    $scope.printUrl = DocumentService.printUrl()

    $state.go('printdocument')

}