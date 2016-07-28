module.exports = function(DocumentService, DocumentApiService, $sce, MathJaxService) {

    this.getDocumentList = function(scope) {
        
        scope.title = DocumentService.title()
        scope.text = DocumentService.text()
        scope.renderedText = function() { return $sce.trustAsHtml(DocumentService.renderedText()); }
        scope.docArray = DocumentService.documentList()
        scope.documentCount = DocumentService.documentCount()
        
        scope.$watch(function(local_scope) { 
                    return local_scope.renderedText },
                    MathJaxService.reload('DocumentRouteService: getDocumentList')              
                );
        
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
                
                scope.$watch(function(scope) { 
                    return scope.renderedText },
                    function() { MathJax.Hub.Queue(["Typeset", MathJax.Hub]); console.log("EDIT: reloadMathJax called"); }
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