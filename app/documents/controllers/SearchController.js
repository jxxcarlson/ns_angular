module.exports = function($scope, SearchService, TableOfContentsService) {

        $scope.doSearch = function(){

            console.log('In doSearch, $scope.searchText = ' + $scope.searchText)

            TableOfContentsService.setMode('search')


            if ($scope.searchText != '') {

                SearchService.query($scope.searchText, $scope, 'documents')

            }


      }
    }                                      