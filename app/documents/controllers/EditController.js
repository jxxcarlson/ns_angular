  module.exports = function($scope, $window, $document, $stateParams, $http, $sce, $timeout, 
                             DocumentService, DocumentApiService, UserService, GlobalService,
                             MathJaxService, hotkeys, $interval) {

        var id;
        var apiServer = GlobalService.apiServer()
        
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
                console.log('periodicUpdate ' + updateCount)
                
                DocumentApiService.update(DocumentService.params($scope), $scope)
              
                MathJaxService.reload()
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
        $scope.publicStyle = function() {
            
            if ($scope.statusPublic) {
                return { "background-color": "#fee", "padding": "3px"}
            } else {
                return { "padding": "3px"}
            }
        }
        

        /* Get most recent version from server */
        $http.get('http://' + apiServer + '/v1/documents/' + id  )
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
                    MathJaxService.reload('EditController')              
                );

                DocumentService.update(document)
                
                $scope.statusPublic = DocumentService.getPublic()
                
            })

        
        $scope.updateDocument = function() {
           
            DocumentApiService.update(DocumentService.params($scope), $scope)        
        
        }

}