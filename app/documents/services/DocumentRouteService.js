module.exports = function(DocumentService, $localStorage, DocumentApiService, CollectionService, $sce, MathJaxService, GlobalService, UserService) {

    this.getDocumentList = function(scope) {


        var _documentList = DocumentService.documentList()

        if (_documentList.length == 0) {

            DocumentService.resetDocumentList()
            _documentList = $localStorage.documentList
        }

        console.log('DRS(-1) document count = ' + _documentList.length)

        if (_documentList == undefined) { console.log ('DRS, _documentList is UNDEFINED')}

        console.log('DRS, ' + _documentList.length + ' documents')

        if (_documentList.length == 0) {

            var document = GlobalService.defaultDocumentHash()
            _documentList = [document]

        } else {

            var document = _documentList[0]

        }

        console.log('DRS(00) document count = ' + _documentList.length)
        console.log('DRS, document = ' + JSON.stringify(document))

        
        scope.title = document.title
        scope.text = document.text
        scope.renderedText = function() { return $sce.trustAsHtml(document.rendered_text); }


        if (UserService.accessToken() == '') {

            scope.docArray = _documentList.filter( function(x) { return x.public == true }) || []
        }
        else {

            scope.docArray = _documentList || []
        }

        console.log('1. DocumentRouteService, getDocumentList :: ' + _documentList)
        console.log('2. DocumentRouteService, getDocumentList :: ' + scope.docarray)

        scope.documentCount = _documentList.length
        
        console.log('3. DocumentService.getDocumentList: ' + scope.documentCount + ' documents')
        
        if (document.links.parent == undefined) {
                    
            scope.collectionTitle = undefined 
            scope.tableOfContentsTitle = 'Search results (' + DocumentService.documentCount() + ')'
        }
        else
        {
            scope.collectionTitle = document.links.parent.title
            scope.collectionId = document.links.parent.id
            scope.hideCollection = (document.links.parent.id == DocumentService.documentId())
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


                ///// xx  ////

                var _documentList = DocumentService.documentList()

                if (_documentList.length == 0) {

                    DocumentService.resetDocumentList()
                    _documentList = $localStorage.documentList
                }

                console.log('DRS(-1) document count = ' + _documentList.length)

                if (_documentList == undefined) { console.log ('DRS, _documentList is UNDEFINED')}

                console.log('DRS, ' + _documentList.length + ' documents')

                if (_documentList.length == 0) {

                    var document = GlobalService.defaultDocumentHash()
                    _documentList = [document]

                } else {

                    var document = _documentList[0]

                }

                ///// xx ////

                if (UserService.accessToken() == '') {

                    scope.docArray = _documentList.filter( function(x) { return x.public == true })
                }
                else {

                    scope.docArray = _documentList
                }
                scope.numberOfDocuments = _documentList.length


                //////
                var imageRegex = new RegExp("image/")
                var pdfRegex = new RegExp("application/pdf")

                scope.imageKind = imageRegex.test(document.kind)
                scope.pdfKind = pdfRegex.test(document.kind)
                scope.textKind = (!scope.imageKind && !scope.pdfKind)

                if (scope.imageKind || scope.pdfKind ) {

                    scope.attachmentUrl = $sce.trustAsResourceUrl(DocumentService.attachmentUrl())
                }

                console.log('Kinds: ' + scope.imageKind +', ' +  scope.pdfKind +', ' +  scope.textKind )

                
                 if (document.public == true ) {
                        scope.status = 'public'
                    } else {
                        scope.status = 'private'
                    }
                
                scope.$watch(function(local_scope) { 
                    return local_scope.renderedText },
                    MathJaxService.reload(document.kind, 'DocumentRouteService: getDocument')
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