  module.exports = function($scope, $routeParams, $http, $sce, $timeout, DocumentService, UserService) {

        var id;
        console.log('EDIT CONTROLLER, $routeParams.id: ' + $routeParams.id)
        if ($routeParams.id != undefined) {
            id = $routeParams.id
        } else {
            id = DocumentService.documentId();
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
               
                // XX: reload MathJax is needed here
                $scope.$watch(function(scope) { 
                    return scope.renderedText },
                    function() { MathJax.Hub.Queue(["Typeset", MathJax.Hub]); console.log("EDIT: reloadMathJax called"); }
                    // DocumentService.refreshMathJax
                );

                /* Update local storage */
                DocumentService.setDocumentId(document['id'])
                DocumentService.setTitle(document['title'])
                DocumentService.setText(document['text'])
                DocumentService.setRenderedText(document['rendered_text'])
                console.log('I set the title to ' + DocumentService.title())
            })

        /* updateDocument */
        $scope.updateDocument = function() {

            var parameter = JSON.stringify({id:id, title: $scope.editableTitle, text:$scope.editText, token: UserService.accessToken() });

            console.log('parameter:' + parameter);

            $http.post('http://localhost:2300/v1/documents/' + id, parameter)
                .then(function(response){
                    var rt;
                    if (response.data['status'] == '202') {
                        var document = response.data['document']

                        /* Update local storage */
                        DocumentService.setDocumentId(document['id'])
                        DocumentService.setTitle(document['title'])
                        DocumentService.setText(document['text'])                          
                        DocumentService.setRenderedText(document['rendered_text'])

                        /* Update $scope */
                        $scope.title = document['title']
                        $scope.renderedText = function() { return $sce.trustAsHtml(document['rendered_text']); }
                        $scope.message = 'Success!'
                        
                        
                        // XX: Is this needed?
                        

                    } else {
                        $scope.message = response.data['error']
                    }

                    console.log('status = ' + String(response.data['status']))

                })
        }

}