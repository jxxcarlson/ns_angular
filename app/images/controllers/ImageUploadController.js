
/*****

CHEYENNE WALLACE: ANGULAR UPLOAD WITH PRESIGNED URL
http://www.cheynewallace.com/uploading-to-s3-with-angularjs-and-pre-signed-urls/

RUBY: UPLOAD WITH PRESIGNED URL
http://docs.aws.amazon.com/AmazonS3/latest/dev/UploadObjectPreSignedURLRubySDK.html#UploadObjectPreSignedURLRubySDKV2

*****/

 module.exports =  function($scope, $http, $state, UserService, envService) {
        
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
           
            var req = {
                 method: 'PUT',
                 url: response.url,
                 headers: { 'Content-Type': file.type },
                 data: file
                }
            var file_url = response.url
            console.log("-- now PUT request: " + JSON.stringify(req))
            
             // Upload file to S3
            $http(req)
            .success(function(response) {
                var query = {
                    title: $scope.title,
                    filename: file.name,
                    title: $scope.title,
                    content_type: file.type,
                    owner: UserService.username()
                };
                
                // Add image to API database
                $http.post(envService.read('apiUrl') + '/images', query )
                    .success(function(response){
                    console.log('IMAGE ID: ' + response['id'])
                    // ImageSearchService.query('id='+id)
                    $state.go('images', {}, {reload: true})
                })
                
              //Finally, We're done
              console.log('Upload Done!')
            })
            .error(function(response) {
              console.log("Error:" + JSON.stringify(response));
            });
        })
    };             
}
 
