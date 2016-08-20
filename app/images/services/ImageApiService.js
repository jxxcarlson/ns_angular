module.exports = function($http, $q, ImageService, envService, UserService) {

    
        var deferred = $q.defer();

    
        this.getImage = function(id) {
             
        console.log('Image API service says id = ' + id)
          
          var url = envService.read('apiUrl') + '/images/' + id
          var options = { headers: { "accesstoken": UserService.accessToken() }}
          return  $http.get(url, options)
          .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                var data = response.data
                var image = data['image']
                
                ImageService.set(image)
                             
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
            
          var url = envService.read('apiUrl') + '/images' + '?' + $scope.searchText 
          var options = { headers: { "accesstoken": UserService.accessToken() }}
          return  $http.get(url, options)
          .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                var data = response.data
                var image = data['image']
                ImageService.set(image)
                return deferred.promise;

            }, function (response) {
                // the following line rejects the promise
                deferred.reject(response);
                // promise is returned
                return deferred.promise;
            })
        }

    this.update = function(params, id) {

        var url = envService.read('apiUrl') + '/images/' + id
        var json = JSON.stringify(params)
        var options = { headers: { "accesstoken": UserService.accessToken() }}

        return  $http.post(url, json, options)
            .then(function (response) {

                deferred.resolve(response.data);
                console.log(response.data['status'])
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