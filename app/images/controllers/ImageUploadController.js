
/*****

CHEYENNE WALLACE: ANGULAR UPLOAD WITH PRESIGNED URL
http://www.cheynewallace.com/uploading-to-s3-with-angularjs-and-pre-signed-urls/

RUBY: UPLOAD WITH PRESIGNED URL
http://docs.aws.amazon.com/AmazonS3/latest/dev/UploadObjectPreSignedURLRubySDK.html#UploadObjectPreSignedURLRubySDKV2

*****/

 module.exports =  function($scope, $q, $http, $state, UserService, envService, ImageSearchService) {

     // var deferred = $q.defer();
        
    $scope.upload = function (file) {

        var options = { headers: { "accesstoken": UserService.accessToken() }}

        var query = {
            filename: file.name,
            title: $scope.formData.title,
            source: $scope.formData.source,
            attach: true, // $scope.formData.attach,
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
            var file_url = response.url
            
             // 2. Upload file to S3
            $http(req)
            .success(function(response) {
                console.log('_IMAGE:  success, image uploaded to S3', JSON.stringify(response))
                /*
                var query = {
                    title: $scope.formData.title,
                    filename: file.name,
                    source: $scope.formData.source,
                    attach: $scope.formData.attach,
                    content_type: file.type,
                    owner: UserService.username()
                };
                */

                console.log("IMAGE QUERY: " + JSON.stringify(query))
                // 3. Add image to API database
                $http.post(envService.read('apiUrl') + '/images', query, options )
                    .success(function(response){
                    console.log('_IMAGE:  success,create image database record, id = ' + response['id'])
                    console.log('_IMAGE:  success,create image database record, response = ' + JSON.stringify(response))
                    if ($scope.formData.attach == true ) {

                        console.log('_IMAGE: FORK A')

                        //$state.go('documents', {id: response['parent_id']}


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
 
