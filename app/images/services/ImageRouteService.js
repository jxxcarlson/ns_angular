
module.exports = function(ImageService, ImageApiService) {
    

    this.getImageList = function(scope) {
        
        console.log('ImageRouteService: getImageList')
        console.log('foo: ', scope.foo)
        /*
        scope.title = ImageService.title()
        scope.imageArray = ImageService.ImageList()
        scope.ImageCount = ImageService.ImageCount()
        */
    }
    
    
    this.getImage = function(scope, id) {
        
        console.log('ImageRouteService: getImage ' + id)

        
        
        ImageApiService.getImage(id)
        .then(
            function (response) {
                var data = response['data']
                
                // ImageService.set
                ImageService.updateScope(scope)
                
                
                
            },
            function (error) {
                // handle errors here
                // console.log(error.statusText);
                console.log('ERROR!');
            }
        );
        

    }
}