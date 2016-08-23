  module.exports = function($scope, $window, $document, $stateParams, $state, $http, $sce, $timeout,
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

              $scope.identifier = document.identifier
              $scope.tags = document.tags


              console.log('EEE, title = ' + $scope.editDocument.title)

               $scope.docArray = DocumentService.documentList()
              $scope.documentCount = DocumentService.documentCount()




              $scope.updatePublicStatus = function() {

              }

              $scope.$watch(function(scope) {
                      return $scope.renderedText },
                  MathJaxService.reload(DocumentService.kind(), 'EditController, get Document: ' + id)
              );

              DocumentService.update(document)

             // $scope.statusPublic = DocumentService.getPublic()


          })

      // $state.go($state.$current, null, { reload: true })

      $scope.text = DocumentService.text() // for word count

      $scope.ifParentExists = (DocumentService.currentCollectionItem().id != 0)

      $scope.wordCount = $scope.text.split(' ').length

      $scope.toggleParameterEditor = function() {

          $scope.identifier = DocumentService.identifier()
          $scope.tags = DocumentService.tags()
          $scope.kind = DocumentService.kind()
          $scope.showTools = !$scope.showTools
      }

      console.log('INITIAL editOptions: ' + JSON.stringify($scope.editOptions))


      
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
               console.log('key up: ' + event.keyCode + ', count = ' + keyStrokeCount)
           
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
            
            if (kk == DocumentService.kind()) {
                return { "background-color" : "#efe" }
            } else {
                return {  } 
            }
        }
         
        $scope.setKind = function(kk) {
            
            console.log('Set document kind to ' + kk)
            var id = DocumentService.documentId()
            var params = {id: id, kind: kk, author_name: DocumentService.author()}
            DocumentApiService.update(params, $scope)
        }

      $scope.setParams = function(kk) {

          console.log('Set document kind to ' + kk)
          var id = DocumentService.documentId()
          var params = {id: id, tags: $scope.tags,
              identifier: $scope.identifier, author_name: DocumentService.author()}
          DocumentApiService.update(params, $scope)
      }

      $scope.attachDocument = function() {

          console.log('Attach current document  ' + $scope.childOf)
          var id = DocumentService.currentDocumentItem().id
          var params = {id: id, query_string: 'attach_to=' + $scope.childOf, author_name: DocumentService.author()}
          DocumentApiService.update(params, $scope)
      }



        $scope.moveUp = function() {

            var parent_id = DocumentService.currentCollectionItem().id
            console.log('MOVE: ' + id + ' up in ' + parent_id )
            DocumentApiService.move_subdocument(parent_id, id, 'move_up', $scope)

        }

       $scope.moveDown = function() {

          var parent_id = DocumentService.currentCollectionItem().id
          console.log('MOVE: ' + id + ' down in ' + parent_id )
          DocumentApiService.move_subdocument(parent_id, id, 'move_down', $scope)

      }

        // Get most recent document from server


        // update document
        $scope.updateDocument = function() {
           
            console.log('EDITOR, updateDocument')


            DocumentApiService.update(DocumentService.params($scope), $scope)        
        
        }

}