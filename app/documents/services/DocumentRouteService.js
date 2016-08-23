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

                var document = DocumentService.document()
                scope.document = document // NEEDED?

                scope.title = document.title
                scope.text = document.text
                scope.renderedText = function() { return $sce.trustAsHtml(document.rendered_text); }



                CollectionService.getCollectionItem(scope)

                
                scope.hideCollection = (DocumentService.collectionId() == DocumentService.documentId())
                
                var cdi = DocumentService.currentDocumentItem()
                console.log('**** DRS, currentDocumentItem: ' + cdi.id + ', ' + cdi.title + ', terminal = ' + DocumentService.currentDocumentIsTerminal())
                console.log('XXX(0) title = ' + scope.document.title)



                if (UserService.accessToken() == '') {

                    scope.docArray = DocumentService.documentList().filter( function(x) { return x.public == true })
                }
                else {

                    scope.docArray = DocumentService.documentList()
                }
                scope.numberOfDocuments = DocumentService.documentCount()


                //////
                var imageRegex = new RegExp("image/")
                var pdfRegex = new RegExp("application/pdf")

                scope.imageKind = imageRegex.test(DocumentService.kind())
                scope.pdfKind = pdfRegex.test(DocumentService.kind())
                scope.textKind = (!scope.imageKind && !scope.pdfKind)

                if (scope.imageKind || scope.pdfKind ) {

                    scope.attachmentUrl = $sce.trustAsResourceUrl(DocumentService.attachmentUrl())
                }

                console.log('Kinds: ' + scope.imageKind +', ' +  scope.pdfKind +', ' +  scope.textKind )

                
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

                console.log('ERROR!');
            }
        );

    }

    this.printDocument = function(scope, id, queryObj) {
        DocumentApiService.printDocument(id, queryObj)
            .then(
                function(respose) {
                   scope.printUrl = DocumentService.printUrl()
                    console.log("scope.printUrl: " + scope.printUrl )

                }
            )

    }

}