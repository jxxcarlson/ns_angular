module.exports = function($scope, $stateParams, $confirm, $location, $state, $http, UserService, DocumentService, envService, SearchService) {

    var optionObj = $location.search()
    console.log('IN DELETE, query = ' + JSON.stringify(optionObj))
    console.log('IN DELETE, stateParams = ' + $stateParams.option)
   //  console.log('**** params = ' + JSON.stringify(params))


    $confirm({text: 'Are you sure you want to delete ' + DocumentService.currentDocumentItem().title + '?'})
        .then(function() {
            $scope.deletedConfirm = 'Deleted';
            doDelete()
        });


    var doDelete = function() {

        var parentId = DocumentService.parentId()
        var optionObj = $location.search()





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
                    console.log('2. DDD, parentId  = ' + parentId)

                    if (parentId == undefined || parentId == 0) {

                        console.log('DDD, searching user')

                        SearchService.query('user=' + UserService.username(), $scope, 'documents')

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