
/*****

CHEYENNE WALLACE: ANGULAR UPLOAD WITH PRESIGNED URL
http://www.cheynewallace.com/uploading-to-s3-with-angularjs-and-pre-signed-urls/

RUBY: UPLOAD WITH PRESIGNED URL
http://docs.aws.amazon.com/AmazonS3/latest/dev/UploadObjectPreSignedURLRubySDK.html#UploadObjectPreSignedURLRubySDKV2

*****/

 module.exports =  function($scope, $http, UserService, envService) {
        
    $scope.upload = function (file) {
        console.log("Upload controller sending siging request");
        var query = {
            filename: file.name,
            title: $scope.title,
            source: $scope.source,
            type: file.type,
            owner: UserService.username()
        };
        console.log("-- query: " + JSON.stringify(query))
        // Get presigned URL
        var url = envService.read('apiUrl') + '/presigned'
        console.log("-- url for POST: " + url)
        $http.post(url, query).success(function(response) {
            console.log("Signed response received: " + response.url);
            // Upload file to S3
            var req = {
                 method: 'PUT',
                 url: response.url,
                 headers: { 'Content-Type': file.type },
                 data: file
                }
            var file_url = response.url
            console.log("-- now PUT request: " + JSON.stringify(req))
            $http(req)
            .success(function(response) {
                var query = {
                    title: 'test',
                    filename: file.name,
                    title: $scope.title,
                    content_type: file.type,
                    owner: UserService.username()
                };
                $http.post(envService.read('apiUrl') + '/images', query )
              //Finally, We're done
              console.log('Upload Done!')
            })
            .error(function(response) {
              console.log("Error:" + JSON.stringify(response));
            });
        })
    };             
}
 
