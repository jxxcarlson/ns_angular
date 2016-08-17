module.exports = function(DocumentService, DocumentApiService, $sce, MathJaxService) {

    this.getDocumentList = function(scope) {
        
        
        scope.title = DocumentService.title()
        scope.text = DocumentService.text()
        scope.renderedText = function() { return $sce.trustAsHtml(DocumentService.renderedText()); }
        scope.docArray = DocumentService.documentList()
        console.log('DocuemntRouteService, getDocumentList :: ' + scope.docarray)
        scope.documentCount = DocumentService.documentCount()
        
        console.log('DocumentService.getDocumentList: ' + scope.documentCount + ' documents')
        
        if (DocumentService.collectionTitle() == undefined) {
                    
            scope.collectionTitle = undefined 
            scope.tableOfContentsTitle = 'Search results (' + DocumentService.documentCount() + ')'
        }
        else
        {
            scope.collectionTitle = DocumentService.collectionTitle()
            scope.collectionId = DocumentService.collectionId()
            scope.hideCollection = (DocumentService.collectionId() == DocumentService.documentId())
            scope.tableOfContentsTitle = 'Contents'
        }
        
        scope.$watch(function(local_scope) { 
                    return local_scope.renderedText },
                    MathJaxService.reload(DocumentService.kind(), 'DocumentRouteService: getDocumentList')              
                );
        
    }
    
    
    this.getDocument = function(scope, id) {
        console.log('DocumentRouteService.getDocument, id: ' + id)
        DocumentApiService.getDocument(id)
        .then(
            function (response) {
                scope.title = DocumentService.title()
                
                if (DocumentService.subdocumentCount() > 0) {
                   
                    DocumentService.setCollectionId(DocumentService.documentId())
                    DocumentService.setCollectionTitle(DocumentService.title())
                    
                }
                    
                
                var stackTop = this.collectionStackTop()
                
                if (stackTop == undefined) {
                    
                    scope.collectionTitle = undefined 
                    scope.tableOfContentsTitle = 'Search results (' + DocumentService.documentCount() + ')'
                    
                }
                else
                {
                    scope.collectionTitle = stackTop.title
                    scope.collectionId = stackTop.id
                    scope.tableOfContentsTitle = 'Contents' 
                    
                }
                
                /**
                if (DocumentService.collectionTitle() == undefined) {
                    
                    scope.collectionTitle = undefined 
                    scope.tableOfContentsTitle = 'Search results (' + DocumentService.documentCount() + ')'
                }
                else
                {
                    scope.collectionTitle = DocumentService.collectionTitle()
                    scope.collectionId = DocumentService.collectionId()
                    scope.tableOfContentsTitle = 'Contents'
                }
                **/
                
                scope.hideCollection = (DocumentService.collectionId() == DocumentService.documentId())
                
                var cdi = DocumentService.currentDocumentItem()
                console.log('**** DRS, currentDocumentItem: ' + cdi.id + ', ' + cdi.title + ', terminal = ' + DocumentService.currentDocumentIsTerminal())
                

                
                scope.text = DocumentService.text()
                scope.renderedText = function() { return $sce.trustAsHtml(DocumentService.renderedText()); }
                scope.docArray = DocumentService.documentList()
                scope.numberOfDocuments = DocumentService.documentCount()
                
                
                
                
                 if (DocumentService.getPublic() == true ) {
                        scope.status = 'public'
                    } else {
                        scope.status = 'private'
                    }
                
                scope.$watch(function(local_scope) { 
                    return local_scope.renderedText },
                    MathJaxService.reload(DocumentService.kind(), 'DocumentRouteService: getDocument')              
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