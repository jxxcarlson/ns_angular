
// ROUTES PROCESSED:
// GET /documents
// GET /documents/:id

// REFERENCE: https://github.com/gsklee/ngStorage

module.exports = function($scope, $state, $window, $location, $timeout, $stateParams, $state, $sce, DocumentApiService,
                           DocumentService, UserService, MathJaxService ) {


    var id = $stateParams.id || DocumentService.currentDocumentItem()['id']
    var queryObj =  $location.search()
    
    var innerHeight = $window.innerHeight
    document.getElementById("rendered-text").style.height = (innerHeight - 220) + 'px'
    document.getElementById("toc").style.height = (innerHeight - 220) + 'px'

    DocumentApiService.getDocument($scope, id, queryObj)

    $scope.docStyle = DocumentService.tocStyle
    $scope.hasSubdocument = DocumentService.showThatItHasSubdocuments

    $scope.reloadMathJax = function() {
        $timeout( 
         function() { 
         MathJaxService.reload('MMM, doc ctrl: reloading MathJax for ' + DocumentService.title() )},
        500)
        
    }
    
    $scope.author = function(doc) {
        
        if (doc['author'] != UserService.username()) {

            console.log('Ctrl: author = ' + doc['author'])
            return doc['author'] + ": "
            
        } else {
            
            return ""
        }
        
    }


    if ($scope.tableOfContentsTitle == undefined) {  $scope.tableOfContentsTitle = "Contents (" + DocumentService.documentCount() + ")" }


    if (DocumentService.getPublic()) {
            $scope.statusPublic = 'public'
        } else {
            $scope.statusPublic = 'private'
        }


}