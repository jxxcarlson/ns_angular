
module.exports = function($scope, $http, $state, $location, $localStorage,
                                          foo, UserService, SearchService, envService,
                          DocumentService, HotListService, PermissionService, MathJaxService) {

    var accessTokenValid = UserService.accessTokenValid()

    try {

        var documentCanShowSource = (UserService.accessTokenValid() && DocumentService.document().author != UserService.username())

    }
    catch(err) {

        var documentEditable = false

    }

    $scope.message = ''

    $scope.refreshMathJax = function() {

        // var documentKind = DocumentService.kind()
        var documentKind = 'asciidoc-latex'
        MathJaxService.reload2(documentKind, " reload mathjax (AA) ")
    }

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
        DocumentService.setTocTitle('Random documents:override')
        HotListService.setUseHotList(false, $scope)
        SearchService.query('random=10', $scope, 'documents')
    }

    // console.log('EVENT: ' + JSON.stringify($event.currentTarget))
    envService.set('development');





}
