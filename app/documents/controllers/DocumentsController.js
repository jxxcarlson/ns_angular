// ROUTES PROCESSED:
// GET /documents
// GET /documents/:id

// REFERENCE: https://github.com/gsklee/ngStorage

module.exports = function ($scope, $state, $window, $location, $timeout, $stateParams, $state, $sce, DocumentApiService,

                           DocumentService, HotListService, UserService, MathJaxService, mathJaxDelay, MailService, notFoundErrorDocumentId) {

    console.log('DEBUG: ENTER DOCS CONTROLLER, $stateParams.id: ' + $stateParams.id)
    if (DocumentService.currentDocumentItem() == undefined) {

        console.log('DEBUG: ENTER DOCS CONTROLLER, DocumentService.currentDocumentItem is undefined')

    } else {

        console.log('DEBUG: ENTER DOCS CONTROLLER, DocumentService.currentDocumentItem()[id]: ' + DocumentService.currentDocumentItem()['id'])
    }



    // Validate id and ensure valid value
    var id = $stateParams.id

    var idPattern = /^[A-Za-z0-9\.\?=_]*$/

    if ( idPattern.test(id) == false ) {

        console.log('DEBUG, FIXIT: id is invalid: ' + id)
        id = undefined

    }

    if ( DocumentService.currentDocumentItem() != undefined) {

        var id2 = DocumentService.currentDocumentItem()['id']

        if ( idPattern.test(id2) == false ) {

            console.log('DEBUG, FIXIT: DocumentService.currentDocumentItem()["id"] is invalid: ' + id)
            id2 = undefined

        }
    }


    id = id || id2 || notFoundErrorDocumentId
    // end validate

    var queryObj = $location.search()

    console.log('DEBUG: In DocumentController, call DocumentApiService.getDocument for id = ' + id)
    DocumentApiService.getDocument($scope, id, queryObj)


    $scope.tocTitle = DocumentService.tocTitle()

    /**
    if (DocumentService.documentList() == undefined) {

        $scope.tocHeading = 'X'

    } else {

        $scope.tocHeading = DocumentService.tocTitle() + ' (' + DocumentService.documentList().length + ')'

    }
     */




    console.log('queryObj = ' + JSON.stringify(queryObj))
    console.log('1. queryObj[option] = ' + queryObj['option'])

    if (queryObj['option'] == 'showsource') {

        console.log('SHOW SOURCE')
        $scope.showSource = true
        $scope.renderedTextStyle = "col-md-9"
        $scope.sourceText  = DocumentService.document().text
        $scope.showSourceUrl = "documents/" + id + "?show_source=yes"

    } else {

        console.log('DO NOT SHOW SOURCE')

        $scope.showSource = false
        $scope.renderedTextStyle = "col-md-5"

    }
    

    // Set the height to fill the windows.  It has to be set in this way wiith
    // a fixed (but computed) height so that scrolling will work
    var innerHeight = $window.innerHeight
    document.getElementById("rendered-text").style.height = (innerHeight - 220) + 'px'
    document.getElementById("toc").style.height = (innerHeight - 220) + 'px'
    // document.getElementById("sourcetext").style.height = (innerHeight - 200) + 'px'
    $scope.sourceTextHeight = function() { return 'height: ' + (innerHeight - 220) + 'px' }


    // HERE //


    $scope.docStyle = DocumentService.tocStyle
    $scope.hasSubdocument = DocumentService.showThatItHasSubdocuments
    $scope.documentId = id


    $scope.shareDocument = MailService.shareCurrentDocument


    // Reload MathJax so that mathematical text is properly displayed.
    // Performance depends on just when it is called.  This is still flaky.
    $scope.reloadMathJax = function () {

        /**
        $timeout(
            function () {
                var message = ' (AA), DC for ' + DocumentService.title() + ', kind = ' + DocumentService.kind()
                MathJaxService.reload2(DocumentService.kind(), message)
            },
            mathJaxDelay)
         **/
    }

    $scope.refreshMathJax = function() {
        /*

        // var documentKind = DocumentService.kind()
        var documentKind = 'asciidoc-latex'
        MathJaxService.reload2(documentKind, " (BB), reload mathjax")
        */


    }

    /**
    $scope.$on('$viewContentLoaded', function(){

        console.log(' (XX), content loaded')
        var documentKind = 'asciidoc-latex'
        MathJaxService.reload2(documentKind, " (CC), reload mathjax")

    });
     **/

    // https://www.bennadel.com/blog/2548-don-t-forget-to-cancel-timeout-timers-in-your-destroy-events-in-angularjs.htm
    $scope.$on('$viewContentLoaded', function(){

        console.log(' (XX), content loaded')
        $timeout(
            function () {
                var message = ' (CC), DC for ' + DocumentService.title() + ', kind = ' + DocumentService.kind()
                MathJaxService.reload2(DocumentService.kind(), message)
            },
            mathJaxDelay)

    });


    $scope.docUrl = '/documents/' + id



    // $scope.author displays the document author's
    // username and the username of anyone who has
    // checked out the document The information displayed
    // is dependent on context.  For example, the author
    // user name is not displayed to the author himself
    $scope.author = function (doc) {

        // console.log(doc['title'] + ': ' + doc['author'] + '>>>>> ' + doc['checked_out_to'])

        var checked_out_to = doc['checked_out_to'] || ''

        if (doc['author'] != UserService.username()) {

            if (checked_out_to != '') {

                return doc['author'] + "/" + checked_out_to + ": "

            } else {

                return doc['author'] + ": "
            }

        } else {

            if (checked_out_to != "") {

                return checked_out_to + ": "

            } else {

                return ""
            }
        }
    }

    $scope.hotList = function() {

        HotListService.hotList($scope)
    }



    if (UserService.username() == undefined || UserService.username() == '') {

        console.log('Setting hotlist to false')
        DocumentService.setUseHotList(false , $scope)

    } else {

        console.log('Not setting hotlist to anything')
    }

    // Used by editor to format "Public" button (??)
    if (DocumentService.getPublic()) {
        $scope.isPublic = true
        $scope.statusPublic = 'public'
    } else {
        $scope.isPublic = false
        $scope.statusPublic = 'private'
    }


}