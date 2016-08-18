module.exports = function(DocumentService, DocumentApiService, CollectionService, $sce, MathJaxService, UserService) {

    this.getDocumentList = function(scope) {
        
        
        scope.title = DocumentService.title()
        scope.text = DocumentService.text()
        scope.renderedText = function() { return $sce.trustAsHtml(DocumentService.renderedText()); }
        if (UserService.accessToken() == '') {

            scope.docArray = DocumentService.documentList().filter( function(x) { return x.public == true })
        }
        else {

            scope.docArray = DocumentService.documentList()
        }

        console.log('DocuemntRouteService, getDocumentList :: ' + scope.docarray)
        scope.documentCount = DocumentService.documentCount()
        
        console.log('DocumentService.getDocumentList: ' + scope.documentCount + ' documents')
        
        if (DocumentService.currentCollectionItem().id == 0) {
                    
            scope.collectionTitle = undefined 
            scope.tableOfContentsTitle = 'Search results (' + DocumentService.documentCount() + ')'
        }
        else
        {
            scope.collectionTitle = DocumentService.currentCollectionItem().title
            scope.collectionId = DocumentService.currentCollectionItem().id
            scope.hideCollection = (DocumentService.collectionId() == DocumentService.documentId())
            scope.tableOfContentsTitle = 'Contents'
        }
        
        scope.$watch(function(local_scope) { 
                    return local_scope.renderedText },
                    MathJaxService.reload(DocumentService.kind(), 'DocumentRouteService: getDocumentList')              
                );
        
    }
    
    
    this.getDocument = function(scope, id, queryObj) {
        console.log('DocumentRouteService.getDocument, id: ' + id)
        DocumentApiService.getDocument(id, queryObj)
        .then(
            function (response) {
                scope.title = DocumentService.title()


                CollectionService.getCollectionItem(scope)

                
                scope.hideCollection = (DocumentService.collectionId() == DocumentService.documentId())
                
                var cdi = DocumentService.currentDocumentItem()
                console.log('**** DRS, currentDocumentItem: ' + cdi.id + ', ' + cdi.title + ', terminal = ' + DocumentService.currentDocumentIsTerminal())

                
                scope.text = DocumentService.text()
                scope.renderedText = function() { return $sce.trustAsHtml(DocumentService.renderedText()); }

                if (UserService.accessToken() == '') {

                    scope.docArray = DocumentService.documentList().filter( function(x) { return x.public == true })
                }
                else {

                    scope.docArray = DocumentService.documentList()
                }
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