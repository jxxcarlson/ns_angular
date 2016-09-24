// ROUTES PROCESSED:
// GET /documents
// GET /documents/:id

// REFERENCE: https://github.com/gsklee/ngStorage

module.exports = function ($scope, $state, $window, $location, $timeout, $stateParams, $state, $sce, DocumentApiService,
                           DocumentService, UserService, MathJaxService, mathJaxDelay) {

    console.log('ENTER DOCS CONTROLLER, $stateParams.id: ' + $stateParams.id)

    var id = $stateParams.id || DocumentService.currentDocumentItem()['id']
    var queryObj = $location.search()

    // Set the height to fill the windows.  It has to be set in this way wiith
    // a fixed (but computed) height so that scrolling will work
    var innerHeight = $window.innerHeight
    document.getElementById("rendered-text").style.height = (innerHeight - 220) + 'px'
    document.getElementById("toc").style.height = (innerHeight - 220) + 'px'

    DocumentApiService.getDocument($scope, id, queryObj)

    $scope.docStyle = DocumentService.tocStyle
    $scope.hasSubdocument = DocumentService.showThatItHasSubdocuments


    // Reload MathJax so that mathematical text is propperly displayed.
    // Performance depends on just when it is called.  This is still flaky.
    $scope.reloadMathJax = function () {
        $timeout(
            function () {
                var message = 'MMM, doc ctrl for ' + DocumentService.title() + ', kind = ' + DocumentService.kind()
                MathJaxService.reload(DocumentService.kind(), message)
            },
            mathJaxDelay)
    }


    // $scope.author displays the document author's
    // username and the username of anyone who has
    // checked out the document The information displayed
    // is dependent on context.  For example, the author
    // user name is not displayed to the author himself
    $scope.author = function (doc) {

        if (doc['author'] != UserService.username()) {

            if (doc['checked_out_to'] != '') {

                return doc['author'] + "/" + doc['checked_out_to'] + ": "

            } else {

                return doc['author'] + ": "
            }

        } else {

            if (doc['checked_out_to'] != '') {

                return doc['checked_out_to'] + ": "

            } else {

                return ""
            }
        }
    }

    if (UserService.username() == undefined || UserService.username() == '') {

        console.log('Setting hotlist to false')
        DocumentService.setUseHotList(false , $scope)

    } else {

        console.log('Not setting hotlist to anything')
    }

    // Used by editor to format "Public" button (??)
    if (DocumentService.getPublic()) {
        $scope.statusPublic = 'public'
    } else {
        $scope.statusPublic = 'private'
    }


}