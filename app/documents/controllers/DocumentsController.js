
// ROUTES PROCESSED:
// GET /documents
// GET /documents/:id

REFERENCE: https://github.com/gsklee/ngStorage

module.exports = function($scope, $window, $location, $timeout, $stateParams, $state, $sce, DocumentApiService, 
                           DocumentService, CollectionService, DocumentRouteService, UserService, MathJaxService ) {





    var id = $stateParams.id;
    var queryObj =  $location.search()
    
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
        console.log('XXX(2) DOCUMENT = ' + $scope.document)
        // documentKind = DocumentService.kind()
        // console.log('XXX DOCUMENT = ' + JSON.stringify(DocumentService.document()))

    }

    console.log('XXX(2) DOCUMENT = ' + DocumentService.document().title)

    /**
    if  ($scope.document.links.parent == undefined) {

        console.log('XXX(2) DOCUMENT = ' + $scope.document.title + ', NO PARENT')

    } else {

        console.log('XXX(2) DOCUMENT = ' + $scope.document.title + ', ' + $scope.document.links.parent.title)
    }
     **/



    //////
    var imageRegex = new RegExp("image/")
    var pdfRegex = new RegExp("application/pdf")

    $scope.imageKind = imageRegex.test(DocumentService.kind())
    $scope.pdfKind = pdfRegex.test(DocumentService.kind())
    $scope.textKind = (!$scope.imageKind && !$scope.pdfKind)

    if ($scope.imageKind || $scope.pdfKind ) {


        $scope.attachmentUrl = $sce.trustAsResourceUrl(DocumentService.attachmentUrl())


        console.log('ON SCOPE, ATTACHMENT URL = ' + $scope.attachmentUrl)
    }

    console.log('Kinds: ' + $scope.imageKind +', ' +  $scope.pdfKind +', ' +  $scope.textKind )
    //////




    
    var documentKind = DocumentService.kind()
    
    $scope.docStyle = DocumentService.tocStyle
    $scope.hasSubdocument = DocumentService.showThatItHasSubdocuments

    
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