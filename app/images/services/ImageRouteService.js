
module.exports = function(ImageService, ImageApiService, $state) {
    

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
                ImageService.updateScope(scope)
                $state.go('images', {}, {reload: true})    
                
         },
            function (error) {
                // handle errors here
                // console.log(error.statusText);
                console.log('ERROR!');
            }
        );
        

    }
}