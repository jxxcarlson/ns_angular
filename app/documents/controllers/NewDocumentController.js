module.exports = function ($scope, $location, $state, $http, $localStorage, envService, UserService, SearchService, DocumentService) {


    var _currentDocument = DocumentService.document()
    var parent = _currentDocument.links.parent || {'id': 0, 'title': 'null'}

    $scope.parentDocumentTitle = parent.title
    $scope.currentDocumentTitle = _currentDocument.title

    // Set the parent document if there is one.


    if (parent.id != 0 && $scope.parentDocumentTitle != $scope.currentDocumentTitle) {

        $scope.ifparentdocument = true
    }
    else {

        $scope.ifparentdocument = false
    }

    if (parent.id == 0) {

        $scope.ifnewchild = true

    } else {

        $scope.ifnewchild = false
    }


    $scope.cancel = function () {

        console.log('CANCEL')
        $state.go('documents')

    }

    $scope.formData = {'child': false, 'position': 'null'}


    $scope.submit = function () {

        if ($scope.formData.child == false && $scope.formData.position == 'null') {

            parent = {'id': 0, 'title': 'null'}

            var process_as_child = false

        } else {

            var process_as_child = true

        }

        var access_token = UserService.accessToken()
        var parameter = JSON.stringify({
            title: $scope.title, token: access_token, options: JSON.stringify($scope.formData),
            current_document_id: _currentDocument.id, parent_document_id: parent.id
        });
        var url = envService.read('apiUrl') + '/documents'
        var hasSubdocuments = (DocumentService.subdocumentCount() > 0)

        // Add the newly created document to the document list
        // of the current document
        if (hasSubdocuments) {
            url += '?append=' + DocumentService.documentId()
        }

        // Create document
        $http.post(url, parameter)
            .then(function (response) {
                if (response.data['status'] == 'success') {

                    var newDocument = response.data['document']
                    var newdocumentId = newDocument['id']

                    if (process_as_child) {

                        if (parent.id == 0) {

                            SearchService.query('id=' + newdocumentId, $scope, 'editdocument')
                            $scope.parentTitle = parent.title
                            $scope.parentId = parent.id

                        } else {

                            //SearchService.query('id=' + parent.id, $scope, 'documents')
                            SearchService.query('id=' + newDocument.id, $scope, 'editdocument')
                        }

                    } else {

                        SearchService.query('id=' + newDocument.id, $scope, 'editdocument')
                    }

                } else {

                    $scope.message = response.data['error']

                }
            });
    }
}
