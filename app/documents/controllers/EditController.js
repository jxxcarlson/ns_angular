  module.exports = function($scope, $window, $document, $stateParams, $http, $sce, $timeout, 
                             DocumentService, DocumentApiService, UserService, envService,
                             MathJaxService, hotkeys, $interval) {

      
        console.log('EDIT CONTROLLER, YAY!!')
        var id;
        var keyStrokeCount = 0
        
        if ($stateParams.id != undefined) {
            id = $stateParams.id
        } else {
            id = DocumentService.documentId();
        }
      
      console.log('EDITOR: id = ' + id)
      //DocumentService.setDocumentId(id)
      
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
            console.log('SAVE DOCUMENT ' + $scope.editableTitle )
            // console.log($scope.editText)
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
                console.log('periodicUpdate ' + updateCount)
                console.log('EDITOR, call DocumentApiService($scope)')

                DocumentApiService.update(DocumentService.params($scope), $scope)

                // MathJaxService.reload(DocumentService.kind())
                $scope.textDirty = false
            } else {
                console.log('SKIPPING periodicUpdate')
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


        
        // Initial values:
        $scope.title = DocumentService.title()
        $scope.editableTitle = DocumentService.title()
        $scope.text = DocumentService.text()
        $scope.editText = DocumentService.text()
        $scope.renderedText = function() { return $sce.trustAsHtml(DocumentService.renderedText()); }
        $scope.docArray = DocumentService.documentList()
        $scope.documentCount = DocumentService.documentCount()
        $scope.idIsDefined = (id != undefined)
        
        $scope.wordCount = $scope.text.split(' ').length
        
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
            var params = {id: id, kind: kk}
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
        var url = envService.read('apiUrl') + '/documents/' + id
        var options = { headers: { "accesstoken": UserService.accessToken() }}
        $http.get(url, options  )
            .then(function(response){
            
                var document = response.data['document']
                $scope.title = document['title']
                $scope.editableTitle = $scope.title
                $scope.editText = document['text']
                $scope.renderedText = function() { return $sce.trustAsHtml(document['rendered_text']); }
                
                $scope.updatePublicStatus = function() {
                    
                }
                      
                 $scope.$watch(function(scope) { 
                    return $scope.renderedText },
                    MathJaxService.reload(DocumentService.kind(), 'EditController, get Document: ' + id)              
                );

                DocumentService.update(document)
                
                $scope.statusPublic = DocumentService.getPublic()
                
            })

        // update document
        $scope.updateDocument = function() {
           
            console.log('EDITOR, updateDocument')
            DocumentApiService.update(DocumentService.params($scope), $scope)        
        
        }

}