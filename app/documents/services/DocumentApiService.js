/*****
 headers: { "accesstoken": UserService.accessToken(),
                            "Cache-control": "",
                            "Pragma": "" 
                          }

 The purpose of DocumentApiServices is to communicate with the API server,
 performing the standard CRUD functons

 *****/
module.exports = function ($http, $timeout, $q, $sce, $localStorage, $state, $stateParams, $location, DocumentService, SearchService, UserService, GlobalService, envService, MathJaxService) {


    var setPreferredTocTitle = function(scope) {

        scope.tocTitle = 'Search results'
        scope.tocTitleClass = function () { return { color: 'black'}}
        console.log('**** ' + DocumentService.title() + ': ' + DocumentService.parentId())

        scope.activateContentsHeading = function() {

            console.log('*** go up')
            DocumentService.setTocTitlePreferred('Contents')
            scope.tocTitleClass = function () { return { color: '#005FFF'} }
        }

        console.log('1. TOCTITLE, DocumentService.tocTitlePreferred() = ' + DocumentService.tocTitlePreferred())

        scope.tocTitleClass = function () { return { color: 'black'}}

        if (DocumentService.useHotList()) {

            console.log('2a. TOCTITLE: HOT')
            scope.tocTitle = 'Hotlist'
            scope.tocTitleClass = function () { return { color: 'darkred'}}

        } else if ( DocumentService.tocTitlePreferred() != '' ) {

            scope.tocTitle = DocumentService.tocTitlePreferred()

            console.log('2b. TOCTITLE: OVERRIDE, ' + scope.tocTitle)

            if (scope.tocTitle == 'Contents') {

                scope.tocTitleClass = function () { return { color: 'blue'}}
            }

        } else if (DocumentService.parentId() > 0 || DocumentService.hasSubdocuments()) {

            console.log('2c. TOCTITLE: CONTENTS')

            // scope.tocTitle = 'Contents'
            // scope.tocTitleClass = function () { return { color: '#005FFF'}}

        } else {

            console.log('2d. TOCTITLE: SEARCH RESULTS')
            scope.tocTitle = 'Search results'
        }

        DocumentService.setTocTitlePreferred('')
    }

    var setDocumentList = function(document, scope) {

        console.log('yorick ')

        var links = document['links'] || {}
        var documents = links['documents'] || [] // JJJJ

        console.log('DEBUG: links: ' + links.length)



        // If the document has subdocuments, display them
        // instead of the search results
        if (documents.length > 0 && !(DocumentService.useHotList() == true)) {
            //if (documents.length > 0 ) {
            // if (documents.length > 0) {

            console.log('YOR: Setting document list (subdocs): ' + documents.length)
            DocumentService.setDocumentList(documents)

        }


        var _documentList = DocumentService.documentList()

        console.log('YOR: processing document list: ' + _documentList.length)

        if (_documentList == undefined) {

            DocumentService.resetDocumentList()
            _documentList = $localStorage.documentList
        }

        if (_documentList.length == 0) {

            DocumentService.resetDocumentList()
            _documentList = $localStorage.documentList
        }

        if (UserService.accessToken() == '') {

            scope.docArray = _documentList.filter(function (x) {
                    return x.public == true
                }) || []
        }
        else {

            scope.docArray = _documentList || []
        }
    }

    var setupParent = function(document, scope) {

        var links = document.links
        var parent = links.parent || {}
        if (parent == {}) {

            scope.parentId = 0
            scope.parentTitle = ''

        } else {

            scope.parentId = parent.id
            scope.parentTitle = parent.title
        }
    }

    var setupDocumentKind = function(document, scope) {

        var kind = document.kind
        scope.kind = kind

        var imageRegex = new RegExp("image/")
        var pdfRegex = new RegExp("application/pdf")

        scope.imageKind = imageRegex.test(kind)
        scope.pdfKind = pdfRegex.test(kind)
        scope.textKind = (!scope.imageKind && !scope.pdfKind)

        if (scope.imageKind || scope.pdfKind) {

            scope.attachmentUrl = $sce.trustAsResourceUrl(DocumentService.attachmentUrl())

        }
    }

    this.getDocument = function (scope, id, queryObj) {

        console.log('DAS, getDocument, id: ' + id)
        console.log("DEBUG, in DAS, getDocument, $stateParams: " + JSON.stringify($stateParams))
        console.log("DEBUG, in DAS, getDocument, queryObj: " + JSON.stringify(queryObj))

        if (id == undefined) { id = GlobalService.defaultDocumentID() }
        var url = envService.read('apiUrl') + '/documents/' + id
        var options = {headers: {"accesstoken": UserService.accessToken()}}

        return $http.get(url, options)
            .then(function (response) {

                DocumentService.update(response.data['document'])
                var document = DocumentService.document()
                scope.document = document

                console.log("DEBUG: DAS, get, response.data['permissions'] = " + response.data['permissions'])

                DocumentService.setPermissions(response.data['permissions'])
                DocumentService.setCheckedOutTo(response.data['checked_out_to'])
                UserService.setLastDocumentId(id)
                UserService.setLastDocumentTitle(document.title)

                // The document list reads from $localStorage.currentDocumentList
                scope.docArray = DocumentService.documentList()
                console.log('docArray length = ' + scope.docArray.length)
                scope.title = document.title

                scope.renderedText = function () { return $sce.trustAsHtml(document.rendered_text); }
                scope.sourceText = document.text

                /**
                 var documentItem = DocumentService.currentDocumentItem()
                 var shareDocumentMessage = 'You might be interested in%0D%0A%0D%0A        ' + documentItem.title + '%0D%0A%0D%0Aat http://www.manuscripta.io/documents/' + documentItem.id
                 scope.shareDocumentUrl =  "mailto:" + ""  + "?body=" + shareDocumentMessage // + " ?subject=" + shareDocumentSubject
                 **/

                setupDocumentKind(document, scope)
                setupParent(document, scope)
                if (DocumentService.hasSubdocuments() && (queryObj['toc'] || $stateParams.option == 'toc' )) { setDocumentList(document, scope) }

                setPreferredTocTitle(scope)

            })
    } // End getDocument

    this.getDocumentList = function (scope) {

        console.log('DEBUG: getting document list')

        var _documentList = DocumentService.documentList()


        if (_documentList.length == 0) {

            DocumentService.resetDocumentList()
            _documentList = $localStorage.documentList
        }

        if (_documentList == undefined) {
            console.log('XXX(Route), _documentList is UNDEFINED')
        }


        if (UserService.accessToken() == '') {

            scope.docArray = _documentList.filter(function (x) {
                    return x.public == true
                }) || []
        }
        else {

            scope.docArray = _documentList || []
        }

        scope.documentCount = _documentList.length


    } // End getDocumentList


    this.search = function (searchText) {

        console.log("DEBUG: DAS, search called")

        var deferred = $q.defer();

        var url = envService.read('apiUrl') + '/documents' + '?' + $scope.searchText
        var options = {headers: {"accesstoken": UserService.accessToken()}}
        return $http.get(url, options)
            .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                var jsonData = response.data
                var documents = jsonData['documents']
                DocumentService.setDocumentList(documents)
                // promise is returned
                return deferred.promise;
            }, function (response) {
                // the following line rejects the promise
                deferred.reject(response);
                // promise is returned
                return deferred.promise;
            })
    }

    this.printDocument = function (scope, id, queryObj) {

        var deferred = $q.defer();

        var url = envService.read('apiUrl') + '/printdocument/' + id
        var options = {headers: {"accesstoken": UserService.accessToken()}}
        return $http.get(url, options)
            .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                var jsonData = response.data
                var url = jsonData['url']
                scope.printUrl = jsonData['url']
                // promise is returned
                return deferred.promise;
            }, function (response) {
                // the following line rejects the promise
                deferred.reject(response);
                // promise is returned
                return deferred.promise;
            })
    }

    this.exportLatexDocument = function (scope, id, queryObj) {

        var deferred = $q.defer();

        // url to send to server to generate latex:
        var url = envService.read('apiUrl') + '/exportlatex/' + id
        // We already know the url of the tar file with the exported document:
        scope.exportLatexUrl = "http://psurl.s3.amazonaws.com/latex/" + id + ".tar"
        var options = {headers: {"accesstoken": UserService.accessToken()}}
        return $http.get(url, options)
            .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                var jsonData = response.data
                var  url = jsonData['tar_url']
                // return the title of the document. This is the signal
                // that the tar file is ready
                scope.title = DocumentService.title()
                // promise is returned
                return deferred.promise;
            }, function (response) {
                // the following line rejects the promise
                deferred.reject(response);
                // promise is returned
                return deferred.promise;
            })
    }


    //// EDITOR ////


    this.update = function (params, scope) {

        console.log('Doc Api, update enter')

        var parameter = JSON.stringify(params);

        if (params['query_string'] != undefined) {

            var url = envService.read('apiUrl') + '/documents/' + params['id'] + '?' + params['query_string']
        }
        else {

            var url = envService.read('apiUrl') + '/documents/' + params['id']
        }

        var options = {headers: {"accesstoken": UserService.accessToken()}}

        $http.post(url, parameter, options)
            .then(function (response) {

                console.log('Doc Api, status = ' +  response.data['status'])
                if (response.data['status'] == 'success') {

                    var document = response.data['document']

                    DocumentService.update(document)
                    var _document = DocumentService.document()

                    /* Update $scope */
                    scope.title = _document.title
                    scope.renderedText = function () {
                        return $sce.trustAsHtml(document.rendered_text);
                    }
                    scope.message = 'Success!'

                    console.log('*** childOf = ' + scope.childOf)
                    if (scope.childOf != undefined) {
                        console.log('*** I will go to ' + scope.childOf)
                        SearchService.query('id=' + scope.childOf, scope, '')
                        // location.path('editdocument/' + scope.childOf)
                        // $state.go('editdocument', {}, {reload: true})
                    } else {
                        console.log('*** chldOf was undefined')
                    }

                } else {

                    scope.message = response.data['error']
                }

            })

    }


    this.move_subdocument = function (parent_id, subdocument_id, command, scope) {

        var parameter = JSON.stringify({author_name: DocumentService.author()});
        var url = envService.read('apiUrl') + '/documents/' + parent_id + '?' + command + '=' + subdocument_id
        var options = {headers: {"accesstoken": UserService.accessToken()}}

        $http.post(url, parameter, options)
            .then(function (response) {

                console.log('  -- status: ' + response.data['status'])
                if (response.data['status'] == 'success') {

                    var document = response.data['document']
                    var links = document['links'] || {}
                    var documents = links['documents'] || []
                    if (documents.length > 0) {

                        DocumentService.setDocumentList(documents)
                    }

                    /* Update $scope */
                    scope.title = document['title']
                    scope.renderedText = function () {
                        return $sce.trustAsHtml(document['rendered_text']);
                    }
                    scope.message = 'Success!'

                    /* Update local storage */
                    DocumentService.update(document)
                    $localStorage.currentDocumentItem.id = subdocument_id
                    console.log('MOVE: ' + subdocument_id)
                    $location.path('editdocument/' + subdocument_id)
                    $state.go('editdocument', {}, {reload: true})

                } else {
                    scope.message = response.data['error']
                }

            })

    }

    //// BACKUP UTILITIES ////

    this.backupDocument = function () {

        console.log('API: backupDocument')

        var url = envService.read('apiUrl') + '/backup?put=' + DocumentService.currentDocumentItem().id
        var options = {headers: {"accesstoken": UserService.accessToken()}}

        $http.post(url, {}, options)
            .then(function (response) {

                console.log('  -- backup, status: ' + response.data['status'])
                $state.go('editdocument', {}, {reload: true})


            })

    }



    this.getBackupText = function (backup_number) {

        console.log('API: backupDocument')

        var url = envService.read('apiUrl') + '/backup?view=' + DocumentService.currentDocumentItem().id + '&number=' + backup_number
        var options = {headers: {"accesstoken": UserService.accessToken()}}

        $http.post(url, {}, options)
            .then(function (response) {

                console.log('backup view status: ' + response.data['status'])
                console.log('  -- backup text length ' + response.data['backup_text'].length)

                DocumentService.putBackup(response.data)
                $location.path('backups/')
                $state.go('backups', {}, {reload: true})


            })

    }


    //// HTTP UTILITIES ////

    this.postRequest = function (request, scope) {

        console.log('API: postRequest: ' + request)

        var url = envService.read('apiUrl') + '/' + request
        var options = {headers: {"accesstoken": UserService.accessToken()}}

        return $http.post(url, {}, options)


    }

    this.getRequest = function (request, scope) {

        console.log('API: getRequest: ' + request)

        var url = envService.read('apiUrl') + '/' + request
        var options = {headers: {"accesstoken": UserService.accessToken()}}

        return $http.get(url, {}, options)


    }

    this.deleteRequest = function (request, scope) {

        console.log('API: deleteRequest: ' + request)

        var url = envService.read('apiUrl') + '/' + request
        console.log('URL: ' + url)
        var options = { headers: { "accesstoken": UserService.accessToken() }}

        // var url = envService.read('apiUrl') + '/documents/' + DocumentService.currentDocumentItem().id + '?mode=soft'


        console.log('ACCESS TOKEN: ' + UserService.accessToken())


        return $http.delete(url, options)


    }


}