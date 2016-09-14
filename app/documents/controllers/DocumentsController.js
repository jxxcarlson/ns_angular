// ROUTES PROCESSED:
// GET /documents
// GET /documents/:id

// REFERENCE: https://github.com/gsklee/ngStorage

module.exports = function ( $scope, $state, $window, $location, $timeout, $stateParams, $state, $sce, DocumentApiService,
                           DocumentService, UserService, MathJaxService) {

    console.log('DDD, ENTER DOCS CONTROLLER')
    console.log('DDD, $stateParams.id: ' + $stateParams.id)
    // console.log('DDD, DocumentService.currentDocumentItem()[id]: ' + DocumentService.currentDocumentItem()['id'])

    var id = $stateParams.id || DocumentService.currentDocumentItem()['id']
    var queryObj = $location.search()

    var innerHeight = $window.innerHeight
    document.getElementById("rendered-text").style.height = (innerHeight - 220) + 'px'
    document.getElementById("toc").style.height = (innerHeight - 220) + 'px'

    DocumentApiService.getDocument($scope, id, queryObj)

    $scope.docStyle = DocumentService.tocStyle
    $scope.hasSubdocument = DocumentService.showThatItHasSubdocuments

    // http://stackoverflow.com/questions/14502006/working-with-scope-emit-and-on
    // $scope.$emit('documentChosen', [1,2,3]);
    // $rootScope.$broadcast('documentChosen', [1,2,3]);

    $scope.reloadMathJax = function () {
        $timeout(
            function () {
                var message = 'MMM, doc ctrl for ' + DocumentService.title() + ', kind = ' + DocumentService.kind()
                MathJaxService.reload(DocumentService.kind(), message)
            },
            500)

    }

    if(DocumentService.useHotList()) {

        $scope.tocTitle = 'Hotlist'

    } else {

        console.log(DocumentService.title() + ': ' + DocumentService.parentId())

        if (DocumentService.parentId() != 0) {

            $scope.tocTitle = 'Contents'

        } else {

            $scope.tocTitle = 'Search results'
        }

    }


    $scope.author = function (doc) {

        if (doc['author'] != UserService.username()) {

            return doc['author'] + ": "

        } else {

            return ""
        }

    }

    if ( UserService.username() == undefined || UserService.username() == '') {

        console.log('Setting hotlist to false')
        DocumentService.setUseHotList(false)

    } else {

        console.log('Not setting hotlist to anything')
    }


    if (DocumentService.getPublic()) {
        $scope.statusPublic = 'public'
    } else {
        $scope.statusPublic = 'private'
    }


}