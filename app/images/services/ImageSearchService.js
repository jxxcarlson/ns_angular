module.exports = function($http, $state, ImageService, ImageApiService, QueryParser, envService, UserService) {

    
    this.query = function(searchText, state){

        console.log('_IMAGE: search service')
        console.log("_IMAGE: image service, query = " + searchText)

        var query = QueryParser.parse(searchText)
        console.log('_IMAGE: image service, query = ' + query)
        var options = { headers: { "accesstoken": UserService.accessToken() }}
        var url = envService.read('apiUrl') + '/images' + '?' + query

        console.log('URL: ' + url)
        console.log('OPTIONS: ' + JSON.stringify(options))

        $http.get(url, options)

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
                  