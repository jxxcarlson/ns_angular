module.exports = function(DocumentService, DocumentApiService, $sce) {

    this.getDocumentList = function(scope) {
        
        scope.title = DocumentService.title()
        scope.text = DocumentService.text()
        scope.renderedText = function() { return $sce.trustAsHtml(DocumentService.renderedText()); }
        scope.docArray = DocumentService.documentList()
        scope.documentCount = DocumentService.documentCount()
        
    }
    
    
    this.getDocument = function(scope, id) {
        
        DocumentApiService.getDocument(id)
        .then(
            function (response) {
                scope.title = DocumentService.title()
                scope.text = DocumentService.text()
                scope.renderedText = function() { return $sce.trustAsHtml(DocumentService.renderedText()); }
                scope.docArray = DocumentService.documentList()
                scope.numberOfDocuments = DocumentService.documentCount()
                
            },
            function (error) {
                // handle errors here
                // console.log(error.statusText);
                console.log('ERROR!');
            }
        );

    }
}