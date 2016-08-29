
module.exports = function($scope, $http, $state, $location, $localStorage,
                                          foo, UserService, SearchService, envService, DocumentService) {

    var accessTokenValid = UserService.accessTokenValid()

    try {

        var documentEditable = (UserService.accessTokenValid() && DocumentService.author() == UserService.username())

    }
    catch(err) {

        var documentEditable = false

    }


    $scope.message = ''

    foo.myFunc('MainController')
    $scope.currentSite = UserService.getCurrentSite()
    $scope.currentSiteURL = "site/"+UserService.getCurrentSite()

    $scope.accessTokenValid = accessTokenValid
    $scope.documentEditable = documentEditable

    $scope.randomDocuments = function(){ SearchService.query('random=10', $scope, 'documents') }


    // envService.set('development');




}
