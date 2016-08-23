module.exports = function(DocumentService, $localStorage, DocumentApiService, CollectionService, $sce, MathJaxService, GlobalService, UserService) {

    this.getDocumentList = function(scope) {


        var _documentList = DocumentService.documentList()

        if (_documentList.length == 0) {

            DocumentService.resetDocumentList()
            _documentList = $localStorage.documentList
        }

        console.log('XXX(Route) document count = ' + _documentList.length)

        if (_documentList == undefined) { console.log ('XXX(Route), _documentList is UNDEFINED')}

        console.log('XXX(Route) ' + _documentList.length + ' documents')

        if (_documentList.length == 0) {

            var document = GlobalService.defaultDocumentHash()
            _documentList = [document]

        } else {

            var document = _documentList[0]

        }
        
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

            scope.tableOfContentsTitle = 'Search results (' + DocumentService.documentCount() + ')'
        }
        else
        {
            scope.hideCollection = (document.links.parent.id == DocumentService.documentId())
            scope.tableOfContentsTitle = 'Contents'
        }
        
        scope.$watch(function(local_scope) { 
                    return local_scope.renderedText },
                    MathJaxService.reload(DocumentService.kind(), 'MMM, DocumentRouteService: getDocumentList')
                );
        
    }


    this.printDocument = function(scope, id, queryObj) {
        DocumentApiService.printDocument(id, queryObj)
            .then(
                function(response) {
                   scope.printUrl = DocumentService.printUrl()
                    console.log("scope.printUrl: " + scope.printUrl )

                }
            )

    }

}