
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


module.exports = function($scope, $stateParams, $state, $location, $sce, $window, ImageRouteService, ImageService, ImageSearchService, ImageApiService) {
    
    var id = $stateParams.id;
    
    // Process the given route
    if (id == undefined) {

        $scope.foo = 'bar'
        ImageRouteService.getImageList($scope) 
    } 
    else {

        ImageRouteService.getImage($scope, id)
    } 
    
    var innerHeight = $window.innerHeight
    document.getElementById("image-toc").style.height = (innerHeight - 200) + 'px'
    document.getElementById("pdf-iframe").style.height = (innerHeight - 200) + 'px'
    
    $scope.pdfMode = (ImageService.contentType() == 'application/pdf')

    $scope.imageUrl = ImageService.url()
    $scope.source = ImageService.imageSource()

    $scope.imageStorageUrl = ImageService.storageUrl()
    $scope.pdfImage = $sce.trustAsResourceUrl(ImageService.storageUrl())
    
    $scope.imageCount = ImageService.count()
    $scope.imageList = ImageService.imageList()
    $scope.imageTitle = ImageService.title()
    $scope.imageId = ImageService.imageId()
    $scope.tags = ImageService.tags()

    $scope.updateImage = function() {

        params = { title: $scope.imageTitle, source: $scope.source, tags: $scope.tags }
        ImageApiService.update(params, $scope.imageId)
    }

    $scope.userIsOwnerOfCurrentImage = function() {

        return  true
    }

    $scope.randomImages = function() {

        console.log('_IMAGE: calling search service from Images Controller')
        ImageSearchService.query('random=20', $state)

    }

    
}