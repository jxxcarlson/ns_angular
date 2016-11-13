module.exports = function ($scope, $window, $location, $localStorage, $document, $stateParams, $state, $http, $sce, $timeout,
                           HttpService, DocumentService, TableOfContentsService, DocumentApiService, UserService, envService,
                           BackupService, MathJaxService, mathJaxDelay, PermissionService, hotkeys, $interval) {
    ''
    var id
    var keyStrokeCount = 0


    if ($stateParams.id != undefined) {
        id = $stateParams.id
        console.log('ERROR: $stateParams.id NOT DEFINED') //TROUBLE//
        id = 11 //TROUBLE//
        // DocumentService.setCurrentDocumentItem(id, 'not_yet_defined')
    } else {
        id = DocumentService.document().id;
    }

    $scope.id = id
    $scope.documentId = id
    $scope.author = 'not_yet_defined'

    console.log('EXX: id = ' + id + ', ' + DocumentService.document().id)

    $scope.lastBackupNumber = 'none'


    //// VARS AND FUNCTIONS FOR GET DOCUMENT ////

    var url = envService.read('apiUrl') + '/documents/' + id
    var options = {headers: {"accesstoken": UserService.accessToken()}}

    var setPermissions = function(data) {

        this.permissions = data['permissions']
        this.checkedOutTo = data['checked_out_to']
        this.canShowSource = data['can_show_source']

        console.log('1. DEBUG: In EditController, setPermissions, permissions = ' + data['permissions'])

        PermissionService.setPermissions(permissions)
        PermissionService.setCheckedOutTo(checkedOutTo)
        PermissionService.setCanShowSource(canShowSource)

        if (this.permissions.indexOf('edit') == -1 && this.canShowSource == 'no') {

            console.log('Edit controller, get, permission DENIED')
            $state.go('documents')

        } else {

            console.log('Edit controller, get, permission GRANTED')
        }

    }

    var setScope = function(document) {

        $scope.editDocument = document

        $scope.documentId = document.id
        $scope.title = document.title
        $scope.editableTitle = document.title
        $scope.editText = document.text
        $scope.kind = document.kind
        $scope.aclList = document.dict['acl']

        $scope.renderedText = function () {

            return $sce.trustAsHtml(document.rendered_text)

        }

        var imageRegex = new RegExp("image/")
        var pdfRegex = new RegExp("application/pdf")

        $scope.imageKind = imageRegex.test(document.kind)
        $scope.pdfKind = pdfRegex.test(document.kind)
        $scope.textKind = (!$scope.imageKind && !$scope.pdfKind)
        $scope.attachmentUrl = $sce.trustAsResourceUrl(DocumentService.attachmentUrl())
        $scope.identifier = document.identifier
        $scope.tags = document.tags
        $scope.docArray = TableOfContentsService.documentList()
        $scope.documentCount = TableOfContentsService.documentCount()

        // if (DocumentService.getPublic()) {

        console.log('*** document.public = ' + document.public)
        if (document.public) {
            $scope.statusPublic = true
        } else {
            $scope.statusPublic = false
        }

        /////

        $scope.text = DocumentService.document().text // for word count
        $scope.wordCount = $scope.text.split(' ').length
        $scope.documentCharacterCount = $scope.text.length
        $scope.ifParentExists = true
        $scope.showTools = false

        $scope.$on('$viewContentLoaded', function(){

            console.log(' (XX), content loaded')
            $timeout(
                function () {
                    var message = ' (CC), DC for ' + DocumentService.document().title + ', kind = ' + DocumentService.document().kind
                    MathJaxService.reload2(DocumentService.document().kind, message)
                },
                mathJaxDelay)

        });

    }

    var setupBackup = function(document) {

        $scope.backupDocumentId = function() { return {'id':  document.id } }

        if (document.dict && document.dict['backup']) {

            var backupdata = document.dict['backup']


            var backupNumber = backupdata['number']

            $scope.lastBackupNumber = backupNumber

            var t = backupdata['date'].split(':')  //FIX// //XX// date field can be undefined
            t = t[0] + ':' + t[1]
            t = t.replace('T', ', ')

            $scope.lastBackupDate = t + ' GMT'
            $scope.showBackup = true // !($scope.lastBackupNumber == undefined)

        } else {

            $scope.showBackup = false

        }
    }

    var setupCheckout = function() {

        $scope.checkedOutTo = this.checkedOutTo // XXX // document.dict['checked_out_to']

        $scope.checkoutButtonClass = function () {

            if (this.checkedOutTo.length > 0) {

                if (this.checkedOutTo == UserService.username()) {

                    return {"background-color": "#4f4"}

                } else {

                    return {"background-color": "#f44"}
                }


            } else {

                return {"background-color": "#aaa"}
            }
        }

        if ($scope.checkedOutTo == '' || $scope.checkedOutTo == undefined) {

            $scope.checkedOutMessage = ''

        } else {

            $scope.checkedOutMessage = 'Checked out to ' + $scope.checkedOutTo
        }
    }


    var handleParent = function(document) {

        var links = document.links
        var parent = links.parent || {}
        if (parent == {}) {

            $scope.parentId = 0
            $scope.parentTitle = ''

        } else {

            $scope.parentId = parent.id
            $scope.parentTitle = parent.title
        }

    }

    var setupDocArray = function() {

        var _documentList = TableOfContentsService.documentList()

        if (_documentList.length == 0) {

            TableOfContentsService.resetDocumentList()
            _documentList = $localStorage.documentList
        }

        $scope.docArray = _documentList || []

    }

    //// GET DOCUMENTL: EXECUTED ////
    $http.get(url, options)
        .then(function (response) {

            console.log('2. DEBUG: In EditController, setPermissions, permissions = ' + response.data['permissions'])
            setPermissions(response.data)
            var document = response.data['document']

            setScope(document)
            handleParent(document)
            setupBackup(document)
            setupCheckout()
            setupDocArray()

            // WHY?
            //DocumentService.update(document)
            // $scope.refreshText()




        })  /// END OF GET DOCUMENT


    // Set heights of window parts
    var innerHeight = $window.innerHeight
    document.getElementById("edit-text").style.height = (innerHeight - 200) + 'px'
    document.getElementById("rendered-text").style.height = (innerHeight - 220) + 'px'





    //// FUNCTIONS FOR UPADATE AND RELOAD ////



    $scope.reloadMathJax = function () {
        $timeout(
            function () {
                var message = 'MMM, doc ctrl for ' + DocumentService.document().title + ', kind = ' + DocumentService.document().kind
                MathJaxService.reload(DocumentService.document().kind, message)
            },
            mathJaxDelay)

    }


    //// 1. PERIODIC UPDATE ////

    var callAtInterval = function () {

        if ($scope.textDirty) {
            updateCount += 1
            // console.log('callAtInterval:  UPDATE')
            $scope.wordCount = DocumentService.document().text.split(' ').length
            DocumentApiService.update(DocumentService.params($scope), $scope)
            $timeout(
                function () {
                    var message = 'MMM, doc ctrl for ' + DocumentService.document().title + ', kind = ' + DocumentService.document().kind
                    MathJaxService.reload(DocumentService.document().kind, message)
                },
                mathJaxDelay)
            $scope.textDirty = false
        }


    }


    if (DocumentService.document().kind == 'asciidoc-latex') {

        var periodicUpdate = $interval(callAtInterval, 60 * 1000);  // 1 minute


    } else {

        var periodicUpdate = $interval(callAtInterval, 500) // 0.5 second
    }

    var updateCount = 0

    $scope.$on("$destroy", function () {
        $interval.cancel(periodicUpdate);
    });


    //// 2. REFRESH TEXT: update document command bound to key up for escape key ////

    $scope.refreshText = function () {

        console.log('refreshText')

        var strokesBeforeUpdate = 10
        // This is so that users can view source but
        // not be able to edit it (or rather save any edits)
        if (PermissionService.canEdit() == false) {
            console.log('&&& permission to edit denied')
            return
        } else {

            console.log('&&& permission to edit granted')
        }

        if (event.keyCode == 27) {
            // console.log('ESCAPE pressed -- saving document')
            $scope.wordCount = DocumentService.document().text.split(' ').length
            DocumentApiService.update(DocumentService.params($scope), $scope)
            $timeout(
                function () {
                    var message = 'MMM, doc ctrl for ' + DocumentService.document().title + ', kind = ' + DocumentService.document().kind
                    MathJaxService.reload(DocumentService.document().kind, message)
                },
                mathJaxDelay)
        } else {
            ////
            $scope.textDirty = true
            keyStrokeCount += 1
            //console.log('Else clause, strokes = ' + keyStrokeCount)
            ///if (keyStrokeCount == strokesBeforeUpdate) {
            //console.log('EEE: updating text = ' + keyStrokeCount)
            if (keyStrokeCount == strokesBeforeUpdate && $scope.kind != 'asciidoc-latex') {

                keyStrokeCount = 0
                //console.log('Calling API service, update')
                DocumentApiService.update(DocumentService.params($scope), $scope)
                $scope.wordCount = DocumentService.document().text.split(' ').length
                $scope.textDirty = false
            } else {

                //console.log('---')
            }

            /// }
            ////
        }
    }


    //// FUNCTION DEFINITIONS ////

    $scope.toggleParameterEditor = function () {

        $scope.identifier = DocumentService.document().identifier
        $scope.tags = DocumentService.document().tags
        $scope.kind = DocumentService.document().kind
        $scope.showTools = !$scope.showTools
    }

    $scope.toggleCheckoutDocument = function () {

        console.log('*** CHECK IN/OUT')
        var request = 'checkout?toggle=' + DocumentService.document().id + '&user=' + UserService.username()
        HttpService.postRequest(request, $scope)
            .then(function (response) {

                console.log('  -- reply: ' + response.data['reply'])
                var status = response.data['reply']
                console.log('*** in API, postRequest, status = ' + status)
                if (status == 'checked_in') {

                    $scope.checkedOutMessage = 'Not checked out'

                } else {

                    if (status == undefined) {

                        $scope.checkedOutMessage = 'Not checked out'

                    } else {

                        $scope.checkedOutMessage = 'Checked out to ' + status
                    }

                }

                $scope.checkoutButtonClass()

                $state.go('editdocument', {}, {reload: true})

            })
    }

    $scope.docStyle = TableOfContentsService.tocStyle

    $scope.publicStyle = function () {

        if ($scope.statusPublic) {
            return {"background-color": "#fee", "padding": "3px"}
        } else {
            return {"padding": "3px"}
        }
    }


    $scope.getDocKindClass = function (kk) {

        if ($scope.editDocument) {

            if (kk == DocumentService.document().kind) {
                return {"background-color": "#efe"}
            } else {
                return {}
            }
        } else {

            return {}
        }

    }

    $scope.setKind = function (kk) {

        //console.log('*** kk ' + kk)
        var id = DocumentService.document().id
        var params = {id: id, kind: kk, author_name: DocumentService.document().author}
        DocumentApiService.update(params, $scope)
    }

    $scope.setParams = function (kk) {

        var id = DocumentService.document().id
        var params = {
            id: id, tags: $scope.tags,
            identifier: $scope.identifier, author_name: DocumentService.document().author
        }
        DocumentApiService.update(params, $scope)
    }

    $scope.attachDocument = function () {

        var id = DocumentService.document().id
        var params = {id: id, query_string: 'attach_to=' + $scope.childOf, author_name: DocumentService.document().author}
        DocumentApiService.update(params, $scope)

    }


    $scope.moveUp = function () {

        DocumentApiService.move_subdocument($scope.parentId, id, 'move_up', $scope)

    }

    $scope.moveDown = function () {

        DocumentApiService.move_subdocument($scope.parentId, id, 'move_down', $scope)

    }
    // update document
    $scope.updateDocument = function () {

        DocumentApiService.update(DocumentService.params($scope), $scope)

    }

    $scope.showTools2 = $scope.showTools && !$scope.documentCanShowSource


    $scope.backupDocument = function () {

        console.log('Controller: backupDocument')
        BackupService.backupDocument()

    }


    //// KEY BINDINGS ////

    // Editor hotkeys (not working)
    hotkeys.bindTo($scope)
        .add({
            combo: 'ctrl-s',
            description: 'blah blah',
            allowIn: ['INPUT', 'TEXTAREA'],
            callback: function () {
                alert('SAVE DOCUMENT')
                DocumentApiService.update(DocumentService.params($scope), $scope)
            }
        })

    hotkeys.bindTo($scope)
        .add({
            combo: 'ctrl-w',
            allowIn: ['INPUT', 'TEXTAREA'],
            description: 'blah blah',
            callback: function () {
                alert('WW')
            }
        })



}