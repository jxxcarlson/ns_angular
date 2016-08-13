module.exports = function($http, ImageService, ImageApiService, envService) {
    
    this.query = function(searchText){
        
            console.log('Search text: ' + searchText);
            
            $http.get(envService.read('apiUrl') + '/images' + '?' + searchText  )
            .then(function(response){
              console.log(response.data['status'])
              console.log('Number of images: ' + response.data['image_count'])
              var jsonData = response.data
              var images = jsonData['images']
              ImageService.setImageList(images)
              
              
              var id = images[0]['id']
              console.log('id = ' + id)
              ImageApiService.getImage(id)
              $state.go('images', {reload: true, inherit: false, notify: true })              

            })
        }
}
                  