  module.exports = function($scope, $routeParams, $http, $sce, $timeout, 
                             DocumentService, DocumentApiService, UserService, 
                             MathJaxService, hotkeys, $interval) {

        var id;
        console.log('EDIT CONTROLLER, $routeParams.id: ' + $routeParams.id)
        if ($routeParams.id != undefined) {
            id = $routeParams.id
        } else {
            id = DocumentService.documentId();
        }
      
      hotkeys.bindTo($scope)
        .add({
          combo: 'ctrl-w',
          description: 'blah blah',
          allowIn: ['TEXTAREA'],
          callback: function() {
              console.log('WWWWWWW')
              alert('W')
          }
        })
      
        var callAtInterval = function() {
            if ($scope.textDirty) {
                updateCount += 1
                console.log('periodicUpdate ' + updateCount)
                DocumentApiService.update(id, $scope.editableTitle, $scope.editText, $scope)
                if (DocumentService.kind() == 'asciidoctor-latex') { MathJaxService.reload() }
                $scope.textDirty = false
            } else {
                console.log('SKIPPING periodicUpdate ')
            }
            
            
        }
      
        var periodicUpdate 
        if (DocumentService.kind() == 'asciidoctor-latex') {
            
            periodicUpdate = $interval(callAtInterval, 1*60*1000);  // 1 minute
            
            
        } else {
            
            periodicUpdate = $interval(callAtInterval, 500) // 0.5 second
        }
        
        var updateCount = 0
      
        $scope.$on("$destroy", function(){
            $interval.cancel(periodicUpdate);
        });
      
        $scope.refreshText = function() {
            
            $scope.textDirty = true

        }


        
        /* Initial values: */
        $scope.title = DocumentService.title()
        $scope.editableTitle = DocumentService.title()
        $scope.text = DocumentService.text()
        $scope.editText = DocumentService.text()
        $scope.renderedText = function() { return $sce.trustAsHtml(DocumentService.renderedText()); }
        $scope.docArray = DocumentService.documentList()
        $scope.documentCount = DocumentService.documentCount()

        /* Get most recent version from server */
        $http.get('http://localhost:2300/v1/documents/' + id  )
            .then(function(response){
                var document = response.data['document']
                $scope.title = document['title']
                $scope.editableTitle = $scope.title
                $scope.editText = document['text']
                $scope.renderedText = function() { return $sce.trustAsHtml(document['rendered_text']); }
            
                 $scope.$watch(function(scope) { 
                    return $scope.renderedText },
                    MathJaxService.reload('EditController')              
                );

                /* Update local storage */
                DocumentService.setDocumentId(document['id'])
                DocumentService.setTitle(document['title'])
                DocumentService.setText(document['text'])
                DocumentService.setRenderedText(document['rendered_text'])
                console.log('I set the title to ' + DocumentService.title())
            })

        
        $scope.updateDocument = function() {
            
            DocumentApiService.update(id, $scope.editableTitle, $scope.editText, $scope)        
        
        }

}