module.exports = function($scope, $state, $http, UserService, DocumentService, envService, SearchService) {


    console.log('DELETE DOCUMENT CONTROLLER: ' + DocumentService.currentDocumentItem().title)



    console.log('-- SUBMIT')

    var url = envService.read('apiUrl') + '/documents/' + DocumentService.currentDocumentItem().id
    var options = { headers: { "accesstoken": UserService.accessToken() }}
    console.log('access token: ' + UserService.accessToken())

    // DELETE document
    $http.delete(url, options)
        .then(function(response){
            if (response.data['status'] == 'success') {

                console.log('Response OK, document deleted')
                SearchService.query('scope=user.' + UserService.username(), $scope, 'documents')



            } else {

                console.log('BAD Response, document not created')
                $scope.message = response.data['error']

            }
        });

}