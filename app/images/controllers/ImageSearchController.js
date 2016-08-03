module.exports = function($scope, $state, $location, $http, ImageService, ImageApiService) {
    
        $scope.doImageSearch = function(){
            
            
            console.log('Search text: ' + $scope.searchText);
            
            $http.get('http://localhost:2300/v1/images' + '?scope=' + $scope.searchText  )
            
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
                 $location.path('/images')
                 // $state.reload()       
               })
              
             
            });
            
      };
    
    }
