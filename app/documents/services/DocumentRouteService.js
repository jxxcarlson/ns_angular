module.exports = function(DocumentService, DocumentApiService, $sce, MathJaxService) {

    this.getDocumentList = function(scope) {
        
        
        scope.title = DocumentService.title()
        scope.text = DocumentService.text()
        scope.renderedText = function() { return $sce.trustAsHtml(DocumentService.renderedText()); }
        scope.docArray = DocumentService.documentList()
        scope.documentCount = DocumentService.documentCount()
        
        console.log('DocumentService.getDocumentList: ' + scope.documentCount + ' documents')
        
        scope.$watch(function(local_scope) { 
                    return local_scope.renderedText },
                    MathJaxService.reload('DocumentRouteService: getDocumentList')              
                );
        
    }
    
    
    this.getDocument = function(scope, id) {
        console.log('DocumentRouteService.getDocument, id: ' + id)
        DocumentApiService.getDocument(id)
        .then(
            function (response) {
                scope.title = DocumentService.title()
                scope.text = DocumentService.text()
                scope.renderedText = function() { return $sce.trustAsHtml(DocumentService.renderedText()); }
                scope.docArray = DocumentService.documentList()
                scope.numberOfDocuments = DocumentService.documentCount()
                
                 if (DocumentService.getPublic() == true ) {
                        scope.status = 'public'
                    } else {
                        scope.status = 'private'
                    }
                
                scope.$watch(function(scope) { 
                    return scope.renderedText },
                    MathJaxService.reload('DocumentRouteService: getDocument') 
                );
                
                scope.$watch(function(local_scope) { 
                    return local_scope.renderedText },
                    MathJaxService.reload('DocumentRouteService: getDocument')              
                );
                
            },
            function (error) {
                // handle errors here
                // console.log(error.statusText);
                console.log('ERROR!');
            }
        );

    }
}