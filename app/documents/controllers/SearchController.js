module.exports = function($scope, SearchService) {

        $scope.doSearch = function(){

            SearchService.query($scope.searchText, $scope, 'documents')

      }
    }                                      