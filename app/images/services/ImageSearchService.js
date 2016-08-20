module.exports = function($http, $state, ImageService, ImageApiService, QueryParser, envService) {

    
    this.query = function(searchText, state){


        console.log("IMG: image service, query = " + searchText)

        var query = QueryParser.parse(searchText)

        $http.get(envService.read('apiUrl') + '/images' + '?' + query  )

            .then(function(response){

                var jsonData = response.data
                var images = jsonData['images']
                ImageService.setImageList(images)
                var id = images[0]['id']
                ImageApiService.getImage(id)
                    .then(function(response) {
                        state.go('images', {}, {reload: true})
                    })

            })

    }
}
                  