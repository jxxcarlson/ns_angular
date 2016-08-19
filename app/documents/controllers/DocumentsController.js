
// ROUTES PROCESSED:
// GET /documents
// GET /documents/:id

REFERENCE: https://github.com/gsklee/ngStorage

module.exports = function($scope, $window, $location, $timeout, $stateParams, $state, $sce, DocumentApiService, 
                           DocumentService, DocumentRouteService, UserService, MathJaxService ) {

 
    var id = $stateParams.id;
    var queryObj =  $location.search()
    console.log('*** Doc Ctrl, queryObj = ' + JSON.stringify(queryObj))
    
    var innerHeight = $window.innerHeight
    document.getElementById("rendered-text").style.height = (innerHeight - 220) + 'px'
    // document.getElementById("toc").style.height = '300px' //(innerHeight - 220) + 'px'
    document.getElementById("toc").style.height = (innerHeight - 220) + 'px'

    // Process the given route
    if (id == undefined) { 
        DocumentRouteService.getDocumentList($scope) }
        //documentKind = DocumentService.kind()
        
    else { 
        DocumentRouteService.getDocument($scope, id, queryObj)     
        // documentKind = DocumentService.kind()
    } 
    
    var documentKind = DocumentService.kind()
    
    $scope.docStyle = DocumentService.tocStyle
    
    $scope.reloadMathJax = function() {
        $timeout( 
         function() { 
         MathJaxService.reload('ERERER:  element ready, reloading MathJax for ' + DocumentService.title() )},
        100)
        
    }
    
    $scope.author = function(doc) {
        
        if (doc['author'] != UserService.username()) {
            
            return doc['author'] + ": "
            
        } else {
            
            return ""
        }
        
        
    }
    
    $scope.goUp = function() {
        
        console.log('Rule goUp')
        DocumentService.popCollectionStack()
    }
    
    if (DocumentService.getPublic()) {
            $scope.statusPublic = 'public'
        } else {
            $scope.statusPublic = 'private'
        }

    
    //$scope.$watch(function(scope) { 
        // return $scope.renderedText },
        // The below is totally useless -- it is called too
        // early -- before the document state has been
        // updated.
        //
        //
        // MathJaxService.reload('DocumentController')              
    // );

}