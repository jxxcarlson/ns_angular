
module.exports = function($scope, $http, $state, $location, $localStorage,
                                          foo, UserService, SearchService, envService, DocumentService, PermissionService) {

    var accessTokenValid = UserService.accessTokenValid()

    try {

        var documentCanShowSource = (UserService.accessTokenValid() && DocumentService.author() != UserService.username())

    }
    catch(err) {

        var documentEditable = false

    }

    $scope.message = ''

    foo.myFunc('MainController')
    $scope.currentSite = UserService.getCurrentSite()
    $scope.currentSiteURL = "site/"+UserService.getCurrentSite()

    $scope.accessTokenValid = accessTokenValid
    $scope.documentEditable = PermissionService.canEdit()
    $scope.documentCanShowSource = documentCanShowSource

    $scope.userIsAdmin = (UserService.username == 'c')

    // $scope.randomDocuments = function(){ SearchService.query('random=10', $scope, 'documents') }

    $scope.getRandomDocuments = function () {
        console.log('TOCTITLE, randomDocuments')
        DocumentService.setTocTitlePreferred('Search results')
        DocumentService.setUseHotList(false, $scope)
        SearchService.query('random=10', $scope, 'documents')
    }

    // console.log('EVENT: ' + JSON.stringify($event.currentTarget))
    envService.set('production');

  // ABCDEF



}
