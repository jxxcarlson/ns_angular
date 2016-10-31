module.exports = function ($scope, $location, $state, $http, $localStorage, envService, UserService, SearchService, DocumentService) {


    var self = this
    self.currentDocument = DocumentService.document()
    self.parent = self.currentDocument.links.parent || {'id': 0, 'title': 'null'}


    var setupScope = function(document) {


        $scope.currentDocumentTitle = self.currentDocument.title
        $scope.parentDocumentTitle = self.parent.title


        if (self.parent.id != 0 && $scope.parentDocumentTitle != $scope.currentDocumentTitle) {

            $scope.ifparentdocument = true
        }
        else {

            $scope.ifparentdocument = false
        }

        if (self.parent.id == 0) {

            $scope.ifnewchild = true

        } else {

            $scope.ifnewchild = false
        }
    }

    $scope.cancel = function () {

        console.log('CANCEL')
        $state.go('documents')

    }

    setupScope()
    $scope.formData = {'child': false, 'position': 'null'}

    $scope.submit = function () {

        if ($scope.formData.child == false && $scope.formData.position == 'null') {

            var process_as_child = false

        } else {

            var process_as_child = true

        }

        var title = $scope.title || 'Untitled document  '

        var access_token = UserService.accessToken()
            var parameter = JSON.stringify({
                title: $scope.title, token: access_token, options: JSON.stringify($scope.formData),
                current_document_id: self.currentDocument.id, parent_document_id: self.parent.id
            });


        console.log('**** parameter: ' + parameter)

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

                        if (self.parent.id == 0) {

                            $scope.parentTitle = self.parent.title
                            $scope.parentId = self.parent.id
                            // $state.go('editdocument', {}, {reload: true})
                            SearchService.query('id=' + newdocumentId, $scope, 'editdocument')


                        } else {

                            SearchService.query('id=' + newDocument.id, $scope, 'editdocument')
                        }

                    } else {

                        SearchService.query('id=' + newDocument.id, $scope, 'editdocument')
                        // $state.go('editdocument', {}, {reload: true})
                    }

                } else {

                    $scope.message = response.data['error']

                }
            });
    }
}
