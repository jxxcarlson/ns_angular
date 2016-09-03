/*****
 headers: { "accesstoken": UserService.accessToken(),
                            "Cache-control": "",
                            "Pragma": "" 
                          }

 The purpose of DocumentApiServices is to communicate with the API server,
 performing the standard CRUD functons

 *****/
module.exports = function ($http, $timeout, $q, $sce, $localStorage, $state, $location, DocumentService, SearchService, UserService, GlobalService, envService, MathJaxService) {


    this.getDocument = function (scope, id, queryObj) {


        if (id == undefined) {
            id = GlobalService.defaultDocumentID()
        }
        var url = envService.read('apiUrl') + '/documents/' + id
        var options = {headers: {"accesstoken": UserService.accessToken()}}
        return $http.get(url, options)
            .then(function (response) {

                if (scope == undefined) {

                    console.log('XXX(API) -- WARNING!!  ** scope ** is UNDEFINED')
                }

                var documentHash = response.data['document']

                DocumentService.update(documentHash)
                var document = DocumentService.document()

                scope.document = document
                scope.docArray = DocumentService.documentList()
                scope.title = document.title
                scope.renderedText = function () {

                    return $sce.trustAsHtml(document.rendered_text);

                }

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

                var links = document.links
                var parent = links.parent || {}
                if (parent == {}) {

                    scope.parentId = 0
                    scope.parentTitle = ''

                } else {

                    scope.parentId = parent.id
                    scope.parentTitle = parent.title
                }


                var links = document['links'] || {}
                var documents = links['documents'] || [] // JJJJ

                // If the document has subdocuments, display them
                // instead of the search results
                if (documents.length > 0) {

                    DocumentService.setDocumentList(documents)

                }


                var _documentList = DocumentService.documentList()

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
                /////////////

            })
    } // End getDocument

    this.getDocumentList = function (scope) {

        var _documentList = DocumentService.documentList()

        var _document

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


    //// JJJJ ///
    this.update = function (params, scope) {

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
                    $location.path('editdocument/' + subdocument_id)
                    $state.go('editdocument', {}, {reload: true})

                } else {
                    scope.message = response.data['error']
                }

            })

    }

    this.backupDocument = function () {

        console.log('API: backupDocument')

        var url = envService.read('apiUrl') + '/backup?put=' + DocumentService.currentDocumentItem().id
        var options = {headers: {"accesstoken": UserService.accessToken()}}

        $http.post(url, {}, options)
            .then(function (response) {

                console.log('  -- status: ' + response.data['status'])


            })

    }

    this.postRequest = function (request, scope) {

        console.log('API: postRequest: ' + request)

        var url = envService.read('apiUrl') + '/' + request
        var options = {headers: {"accesstoken": UserService.accessToken()}}

        $http.post(url, {}, options)
            .then(function (response) {

                console.log('  -- reply: ' + response.data['reply'])
                var status = response.data['reply']
                console.log('*** in API, postRequest, status = ' + status)
                if (status == 'checked_in') {

                    scope.checkedOutMessage = ''

                } else {

                    scope.checkedOutMessage = 'Checked out to ' + response.data['reply']
                }

                scope.checkedOutTo = response.data['reply']

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


}