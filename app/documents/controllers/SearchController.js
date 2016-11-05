module.exports = function($scope, SearchService) {

        $scope.doSearch = function(){

            console.log('In doSearch, $scope.searchText = ' + $scope.searchText)


            if ($scope.searchText != '') {

                SearchService.query($scope.searchText, $scope, 'documents')

            }


      }
    }                                      