module.exports = function($scope, $confirm, $state, $http, UserService, DocumentService, envService, SearchService) {


    console.log('DELETE DOCUMENT CONTROLLER: ' + DocumentService.currentDocumentItem().title)



    console.log('-- SUBMIT')

    $confirm({text: 'Are you sure you want to delete ' + DocumentService.currentDocumentItem().title + '?'})
        .then(function() {
            $scope.deletedConfirm = 'Deleted';
            doDelete()
        });


    var doDelete = function() {

        var parentId = DocumentService.parentId()

        console.log('DDD, DocumentService.currentDocumentItem()= ' + DocumentService.currentDocumentItem())
        console.log('DDD, parentId  = ' + parentId)

        var url = envService.read('apiUrl') + '/documents/' + DocumentService.currentDocumentItem().id
        var options = { headers: { "accesstoken": UserService.accessToken() }}
        console.log('access token: ' + UserService.accessToken())

        // DELETE document
        $http.delete(url, options)
            .then(function(response){
                if (response.data['status'] == 'success') {

                    console.log('Response OK, document deleted')

                    if (parentId == undefined) {

                        console.log('DDD, searching user')

                        SearchService.query('scope=user.' + UserService.username(), $scope, 'documents')

                    } else {

                        console.log('DDD, searching for parent')

                        SearchService.query('id=' + parentId, $scope, 'documents')
                    }





                } else {

                    console.log('BAD Response, document not created')
                    $scope.message = response.data['error']

                }
            });

    }


}