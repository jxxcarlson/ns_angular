module.exports = function($scope, $location, $state, $http, $localStorage, envService, UserService, SearchService, DocumentService, CollectionService) {
          
    
      console.log('NEW DOCUMENT CONTROLLER')

      var _currentDocument = DocumentService.document()
      var parent = _currentDocument.links.parent || {'id': 0, 'title': 'null'}


      console.log('New ========')
      console.log('XXX(New Doc), _currentDocument = ' + _currentDocument.id + ', ' + _currentDocument.title)
      console.log('XXX(New Doc), parent.id = ' + parent.id)
      console.log('new -------')
      console.log('XXX(New Doc), parent = ' + JSON.stringify(parent))

      $scope.parentDocumentTitle = parent.title
      $scope.currentDocumentTitle = _currentDocument.title
      console.log('New ========')

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



      $scope.cancel  = function() {

          console.log('CANCEL')
          $state.go('documents')

        }

      $scope.formData = { 'child': false, 'position': 'null'}



      $scope.submit = function() {

          console.log('GGG: before modfication, parent.id = ' + parent.id)

          if ($scope.formData.child == false && $scope.formData.position == 'null' ) {

              parent = {'id': 0, 'title': 'null'}

              var process_as_child = false

          } else {

              var process_as_child = true

          }

          console.log('GGG: process as child = ' + process_as_child)

          var access_token = UserService.accessToken()
          var parameter = JSON.stringify({title:$scope.title, token:access_token, options: JSON.stringify($scope.formData),
              current_document_id: _currentDocument.id, parent_document_id: parent.id});
          var url = envService.read('apiUrl') + '/documents'
          var hasSubdocuments = (DocumentService.subdocumentCount() > 0)
          var lastDocumentId = DocumentService.documentId()
          console.log('GGG: lastDocumentId = ' + lastDocumentId)

          console.log('formData = ' + JSON.stringify($scope.formData)   )

          // Add the newly created document to the document list
          // of the current document
          if (hasSubdocuments) {
              url += '?append=' +DocumentService.documentId()
          }

          // Create document
          $http.post(url, parameter)
          .then(function(response){
                if (response.data['status'] == 'success') {

                      console.log('Reponse OK, document created')

                      var newDocument = response.data['document']

                      console.log('GGG: newDocument = ' + JSON.stringify(newDocument))
                      var newdocumentId = newDocument['id']
                      var newdocumentTitle = newDocument['title']


                      if (process_as_child) {
                          console.log('GGG: BRANCH A')
                          // console.log('**** lastDocumentId: '+ lastDocumentId)
                          // SearchService.query('id='+lastDocumentId, $scope, 'documents')
                          console.log('GGG: parent: ' + parent.title)
                          console.log('GGG: current doc: ' + _currentDocument.title)
                          if (parent.id == 0) {

                              console.log('GGG: I am going to go to new document ' + newdocumentTitle + ', ' + 'id = ' + newdocumentId)
                              SearchService.query('id=' + newdocumentId, $scope, 'editdocument')
                              $scope.parentTitle = parent.title
                              $scope.parentId = parent.id

                          } else {

                              console.log('GGG: I am going to go to document ' + parent.title + ', ' + 'id = ' + parent.id)
                              SearchService.query('id=' + parent.id, $scope, 'documents')
                          }


                          // $location.path('/editdocument/' + parent.id)
                          // $state.go('editdocument', {}, {reload:true})

                          // $location.path('/editdocument/' + id)
                          // $state.go('editdocument', {}, {reload:true})

                      } else {
                          console.log('GGG:BRANCH B, I am going to go to ' + document.title + ', id = ' + document.id  )
                          SearchService.query('id=' + newDocument.id, $scope, 'editdocument')
                          // $location.path('/editdocument/' + document.id)
                          // $state.go('editdocument', {}, {reload:true})
                      }

                      // SearchService.query('id='+id, $scope, 'editOneDocument')

                } else {

                        console.log('BAD Reponse, document not created')
                       $scope.message = response.data['error']

                }
          });
    }
}
