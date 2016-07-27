
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
        
        console.log('ImageRouteService: getImage')
        console.log('foo: ', scope.foo)
        
        
        ImageApiService.getImage(id)
        .then(
            function (response) {
                ImageService.updateScope(scope)
                // scope.title = ImageService.title()
                // scope.imageArray = ImageService.imageList()
                // scope.numberOfImages = ImageService.count()
                
                
            },
            function (error) {
                // handle errors here
                // console.log(error.statusText);
                console.log('ERROR!');
            }
        );
        

    }
}