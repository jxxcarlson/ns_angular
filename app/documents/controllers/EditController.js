  module.exports = function($scope, $window, $location, $localStorage, $document, $stateParams, $state, $http, $sce, $timeout,
                             DocumentService, DocumentApiService, UserService, envService,
                             MathJaxService, hotkeys, $interval) {
''
        var id;
        var keyStrokeCount = 0
        
        if ($stateParams.id != undefined) {
            id = $stateParams.id
        } else {
            id = DocumentService.documentId();
        }

      var url = envService.read('apiUrl') + '/documents/' + id
      var options = { headers: { "accesstoken": UserService.accessToken() }}
      $http.get(url, options  )
          .then(function(response){

              var document = response.data['document'] // JJJJ
              DocumentService.update(response.data['document'])
              var editDocument = DocumentService.document()
              $scope.editDocument = editDocument
              $scope.renderedText = function() { return $sce.trustAsHtml(editDocument.rendered_text); }
              $scope.title = document.title
              $scope.editableTitle = document.title
              $scope.editText = document.text
              $scope.kind = document.kind

              var imageRegex = new RegExp("image/")
              var pdfRegex = new RegExp("application/pdf")

              $scope.imageKind = imageRegex.test($scope.kind)
              $scope.pdfKind = pdfRegex.test($scope.kind)
              $scope.textKind = (!$scope.imageKind && !$scope.pdfKind)
              $scope.attachmentUrl = $sce.trustAsResourceUrl(DocumentService.attachmentUrl())
              $scope.identifier = document.identifier
              $scope.tags = document.tags
              $scope.docArray = DocumentService.documentList()
              $scope.documentCount = DocumentService.documentCount()


              /// HANDLE PARENT ///
              var links = editDocument.links
              var parent = links.parent || {}
              if (parent == {}) {

                  $scope.parentId = 0
                  $scope.parentTitle = ''

              } else {

                  $scope.parentId = parent.id
                  $scope.parentTitle = parent.title
              }


              if (DocumentService.getPublic()) {
                  $scope.statusPublic = true
              } else {
                  $scope.statusPublic = false
              }


              $scope.$watch(function(scope) {
                      return $scope.renderedText },

                  $timeout(
                      function() {
                          MathJaxService.reload(DocumentService.kind(), 'MMM:2, EditController, get Document: ' + id)
                      },
                      10
                  )

              );

              DocumentService.update(document)


              var _documentList = DocumentService.documentList()

              if (_documentList.length == 0) {

                  DocumentService.resetDocumentList()
                  _documentList = $localStorage.documentList
              }

              $scope.docArray = _documentList || []


          })

      $scope.text = DocumentService.text() // for word count
      $scope.wordCount = $scope.text.split(' ').length
      $scope.ifParentExists = true
      $scope.toggleParameterEditor = function() {

          $scope.identifier = DocumentService.identifier()
          $scope.tags = DocumentService.tags()
          $scope.kind = DocumentService.kind()
          $scope.showTools = !$scope.showTools
      }


      // Set heights of window parts
      var innerHeight = $window.innerHeight
      document.getElementById("edit-text").style.height = (innerHeight - 200) + 'px'
      document.getElementById("rendered-text").style.height = (innerHeight - 220) + 'px'
      
      // Editor hotkeys (not working)
      hotkeys.bindTo($scope)
        .add({
          combo: 'ctrl-s',
          description: 'blah blah',
          allowIn: ['INPUT', 'TEXTAREA'],
          callback: function() {
            alert('SAVE DOCUMENT')
            DocumentApiService.update(DocumentService.params($scope), $scope)
          }
        })
      
      hotkeys.bindTo($scope)
        .add({
          combo: 'ctrl-w',
          allowIn: ['INPUT', 'TEXTAREA'],
          description: 'blah blah',
          callback: function() {
            alert('WW')
          }
        })
           
    
        // Auto refresh
        var callAtInterval = function() {
            if ($scope.textDirty) {
                updateCount += 1

                DocumentApiService.update(DocumentService.params($scope), $scope)

                // MathJaxService.reload(DocumentService.kind())
                $scope.textDirty = false
            }


        }

        var periodicUpdate 
        if (DocumentService.kind() == 'asciidoctor-latex') {

            periodicUpdate = $interval(callAtInterval, 60*1000);  // 1 minute


        } else {

            periodicUpdate = $interval(callAtInterval, 500) // 0.5 second
        }

        var updateCount = 0

        $scope.$on("$destroy", function(){
            $interval.cancel(periodicUpdate);
        });
      
      
      // update document command bound to key up for control key
        $scope.refreshText = function() {
            

           if (event.keyCode  == 27) {
               // console.log('ESCAPE pressed -- saving document')
               DocumentApiService.update(DocumentService.params($scope), $scope)
           } else {       
               $scope.textDirty = true
               keyStrokeCount += 1    

               if (keyStrokeCount == 10) {
                   keyStrokeCount = 0
                   DocumentApiService.update(DocumentService.params($scope), $scope)
                   $scope.wordCount = DocumentService.text().split(' ').length
                   $scope.textDirty = false
               }
           }  
        }


        
        $scope.docStyle = DocumentService.tocStyle
        $scope.publicStyle = function() {
            
            if ($scope.statusPublic) {
                return { "background-color": "#fee", "padding": "3px"}
            } else {
                return { "padding": "3px"}
            }
        }
        
         $scope.getDocKindClass = function(kk) {

            if ($scope.editDocument)  {

                if (kk == $scope.editDocument.kind) {
                    return { "background-color" : "#efe" }
                } else {
                    return {  }
                }
            } else {

                return { }
            }

        }
         
        $scope.setKind = function(kk) {

            var id = DocumentService.documentId()
            var params = {id: id, kind: kk, author_name: DocumentService.author()}
            DocumentApiService.update(params, $scope)
        }

      $scope.setParams = function(kk) {

          var id = DocumentService.documentId()
          var params = {id: id, tags: $scope.tags,
              identifier: $scope.identifier, author_name: DocumentService.author()}
          DocumentApiService.update(params, $scope)
      }

      $scope.attachDocument = function() {

          var id = DocumentService.currentDocumentItem().id
          var params = {id: id, query_string: 'attach_to=' + $scope.childOf, author_name: DocumentService.author()}
          DocumentApiService.update(params, $scope)

      }


        $scope.moveUp = function() {

            DocumentApiService.move_subdocument($scope.parentId, id, 'move_up', $scope)

        }

       $scope.moveDown = function() {

          DocumentApiService.move_subdocument($scope.parentId, id, 'move_down', $scope)

      }
        // update document
        $scope.updateDocument = function() {

            DocumentApiService.update(DocumentService.params($scope), $scope)        
        
        }

}