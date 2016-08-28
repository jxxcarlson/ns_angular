
/*****

CHEYENNE WALLACE: ANGULAR UPLOAD WITH PRESIGNED URL
http://www.cheynewallace.com/uploading-to-s3-with-angularjs-and-pre-signed-urls/

RUBY: UPLOAD WITH PRESIGNED URL
http://docs.aws.amazon.com/AmazonS3/latest/dev/UploadObjectPreSignedURLRubySDK.html#UploadObjectPreSignedURLRubySDKV2

*****/

 module.exports =  function($scope, $q, $http, $location, $state, UserService, envService, ImageSearchService, SearchService) {

     // var deferred = $q.defer();


     $scope.formData = { 'title': '', 'source': '', attach: false}


     $scope.cancel  = function() {

         console.log('CANCEL')
         $state.go('images')

     }

     $scope.upload = function (file) {

         $scope.filename = file.name

        var options = { headers: { "accesstoken": UserService.accessToken() }}

        var query = {
            filename: file.name,
            title: $scope.formData.title,
            source: $scope.formData.source,
            attach: $scope.formData.attach,
            type: file.type,
            owner: UserService.username()
        };

        
        // 1. Get presigned URL
        var url = envService.read('apiUrl') + '/presigned'
        $http.post(url, query).success(function(response) {
            console.log('_IMAGE:  success, presigned token received', JSON.stringify(response))
            var req = {
                 method: 'PUT',
                 url: response.url,
                 headers: { 'Content-Type': file.type },
                 data: file
                }
            
             // 2. Upload file to S3
            $http(req)
            .success(function(response) {
                console.log('_IMAGE:  success, image uploaded to S3', JSON.stringify(response))


                console.log("IMAGE QUERY: " + JSON.stringify(query))
                // 3. Add image to API database
                var title = $scope.filename.split('.')[0].replace('_', ' ')
                query['title'] = title
                $http.post(envService.read('apiUrl') + '/images', query, options )
                    .success(function(response){
                    console.log('_IMAGE:  success,create image database record, id = ' + response['id'])
                    console.log('_IMAGE:  success,create image database record, response = ' + JSON.stringify(response))
                    if ($scope.formData.attach == true ) {

                        console.log('_IMAGE: FORK A, parent document = ' + response['parent_document'])

                        SearchService.query('id=' + response['parent_document'])

                    }
                    else {

                        ImageSearchService.query('id='+response['id'], $state)

                        console.log('_IMAGE: FORK B')

                    }

                })


            })
            .error(function(response) {
              console.log("_IMAGE: Error:" + JSON.stringify(response));
            });
        })
    };             
}
 
