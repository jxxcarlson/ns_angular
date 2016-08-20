module.exports = function($scope, $state, $location, $http, ImageService, QueryParser, ImageApiService, envService, UserService) {
    
        $scope.doImageSearch = function(){

            console.log('_IMAGE: search controller')

            var query = QueryParser.parse($scope.searchText)
            var url = envService.read('apiUrl') + '/images' + '?' + query
            var options = { headers: { "accesstoken": UserService.accessToken() }}

            console.log('URL: ' + url)
            console.log('OPTIONS: ' + JSON.stringify(options))


            $http.get(url, options)
            
            .then(function(response){

              var jsonData = response.data
              var images = jsonData['images']
              ImageService.setImageList(images)

              var id = images[0]['id']
              console.log('id = ' + id)
              ImageApiService.getImage(id)
              .then(function(response) {
                 console.log('GOING TO IMAGES')
                 $state.go('images', {}, {reload: true})
               })
             
            });
            
      };
    
    }
