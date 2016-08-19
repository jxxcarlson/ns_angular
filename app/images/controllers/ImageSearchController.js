module.exports = function($scope, $state, $location, $http, ImageService, QueryParser, ImageApiService, envService) {
    
        $scope.doImageSearch = function(){


            var query = QueryParser.parse($scope.searchText)


            console.log('SEARCH CONTROLLER, Search text: ' + query);
            
            $http.get(envService.read('apiUrl') + '/images' + '?' + $scope.searchText  )
            
            .then(function(response){
              
              console.log(response.data['status'])
              console.log('Number of images: ' + response.data['image_count'])
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
