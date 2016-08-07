  module.exports = function($scope, $window, $document, $stateParams, $http, $sce, $timeout, 
                             DocumentService, DocumentApiService, UserService, GlobalService,
                             MathJaxService, hotkeys, $interval) {

        var id;
        var apiServer = GlobalService.apiServer()
        
        console.log('EDIT CONTROLLER, $stateParams.id: ' + $stateParams.id)
        if ($stateParams.id != undefined) {
            id = $stateParams.id
        } else {
            id = DocumentService.documentId();
        }
      
      var innerHeight = $window.innerHeight
      document.getElementById("edit-text").style.height = (innerHeight - 200) + 'px'
      document.getElementById("rendered-text").style.height = (innerHeight - 220) + 'px'
      
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
                console.log('periodicUpdate ' + updateCount + 'statusPublic: ' + $scope.statusPublic)
                DocumentApiService.update(id, $scope.editableTitle, $scope.editText, $scope.statusPublic, $scope)
                if (DocumentService.kind() == 'asciidoctor-latex') { MathJaxService.reload() }
                $scope.textDirty = false
            } else {
                console.log('SKIPPING periodicUpdate, ' + 'statusPublic: ' + $scope.statusPublic)
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
        
        $scope.docStyle = DocumentService.tocStyle
        

        /* Get most recent version from server */
        $http.get('http://' + apiServer + '/v1/documents/' + id  )
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

                DocumentService.update(document)
                
                $scope.statusPublic = DocumentService.getPublic()
                
            })

        
        $scope.updateDocument = function() {
            
            DocumentApiService.update(id, $scope.editableTitle, $scope.editText, $scope.statusPublic, $scope)        
        
        }

}