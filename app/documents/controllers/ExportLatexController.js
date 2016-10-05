module.exports = function($scope, $stateParams, $state, $sce, DocumentApiService,
                          DocumentService ) {

    console.log('EXX: controller ExportLaTeXt')

    var id = DocumentService.currentDocumentItem().id


    console.log('  -- EXX: id =' + id)


    DocumentApiService.exportLatexDocument($scope, id, {})


}