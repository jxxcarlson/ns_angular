module.exports = function($http, $q, ImageService) {

        var deferred = $q.defer();

        this.getImage = function(id) {
             
        console.log('Image API service says id = ' + id)
        
          return  $http.get('http://localhost:2300/v1/images/' + id  )
          .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                var data = response.data
                var image = data['image']
                ImageService.setTitle( image['title'] )
                ImageService.setId( image['id'] )
                ImageService.setUrl( image['url'] )
                ImageService.setStorageUrl( image['storage_url'] )
                

                // promise is returned
                return deferred.promise;
            }, function (response) {
                // the following line rejects the promise
                deferred.reject(response);
                // promise is returned
                return deferred.promise;
            })
            
            
        }
        
        
        this.search = function(searchText) {
          return  $http.get('http://localhost:2300/v1/images' + '?' + $scope.searchText  )
          .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                console.log(response.data['status'])
                console.log('Number of images: ' + response.data['image_count'])
                var jsonData = response.data
                var images = jsonData['images']
                // ImageService.setImageList( images )
                // promise is returned
                return deferred.promise;
            }, function (response) {
                // the following line rejects the promise
                deferred.reject(response);
                // promise is returned
                return deferred.promise;
            })
        }
    

      }