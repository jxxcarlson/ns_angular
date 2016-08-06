module.exports = function($scope, $state, $location, $http, ImageService, ImageApiService, GlobalService) {
    
        $scope.doImageSearch = function(){
            
            var apiServer = GlobalService.apiServer()
            
            console.log('Search text: ' + $scope.searchText);
            
            $http.get('http://' + apiServer + '/v1/images' + '?scope=' + $scope.searchText  )
            
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
                 $state.go('images')       
               })
              
             
            });
            
      };
    
    }
