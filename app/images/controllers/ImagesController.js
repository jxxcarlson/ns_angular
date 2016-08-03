
/*
GET /images
GET /images/:id

REFERENCE: https://github.com/gsklee/ngStorage

For example, URL’s like /route/12345?a=2&b=3 will match the route /route
with id 12345 and query string variables a & b. Now those values can
be accessed in controller code using $stateParams service. Any parameter
[preceded by ':'] in route can be accessed in controller by it’s name
using $stateParams.paramName. Additionally, any query string passed
in URL can be accessed in controller using $stateParams.variableName
*/


module.exports = function($scope, $stateParams, $location, ImageRouteService, ImageService) {
// module.exports = function($scope, $location, $stateParams, ImageApiService, ImageService, ImageRouteService) {
// module.exports = function() {
    
    console.log('ImagesController')

    
    console.log('ImagesController, $stateParams.id = ' + $stateParams.id)
    console.log('ImagesController, search = ' + $stateParams.search)
    console.log('ImagesController, URL = ' + $location.absUrl())
    console.log('ImagesController, QS = ' + JSON.stringify($location.search()))
   
    
    
    var id = $stateParams.id;
    var queryString =  $location.search()
    // https://docs.angularjs.org/api/ng/service/$location
    
    
    // Process the given route
    if (id == undefined) { 
        $scope.foo = 'bar'
        ImageRouteService.getImageList($scope) 
    } 
    else { 
        ImageRouteService.getImage($scope, id)     
    } 
    
    
    $scope.imageUrl = ImageService.url()
    $scope.imageStorageUrl = ImageService.storageUrl()
    $scope.imageCount = ImageService.count()
    $scope.imageList = ImageService.imageList()
    $scope.imageTitle = ImageService.title()
    $scope.imageId = ImageService.id()
    
    console.log('IMAGE URL = ' + ImageService.url())
    console.log('IMAGE STORAGE URL = ' + ImageService.storageUrl())
    console.log('IMAGE COUNT = ' + $scope.imageList.length)
    
}