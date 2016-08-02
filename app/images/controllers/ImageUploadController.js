
/*****

CHEYENNE WALLACE: ANGULAR UPLOAD WITH PRESIGNED URL
http://www.cheynewallace.com/uploading-to-s3-with-angularjs-and-pre-signed-urls/

RUBY: UPLOAD WITH PRESIGNED URL
http://docs.aws.amazon.com/AmazonS3/latest/dev/UploadObjectPreSignedURLRubySDK.html#UploadObjectPreSignedURLRubySDKV2

*****/

 module.exports =  function($scope, $http, UserService) {
        
    $scope.upload = function (file) {
        console.log("UploadCtrl sending S3sign request");
        console.log("  File name: " + file.name);
        console.log("File type: " + file.type);
        var query = {
            filename: file.name,
            type: file.type,
            owner: UserService.username()
        };
        // Get presigned URL
        $http.post('http://localhost:2300/v1/presigned', query).success(function(response) {
            console.log("UploadCtrl s3sign response received");
            console.log("UploadCtrl URL in repsonse: " + response.url)
            // Upload file to S3
            var req = {
                 method: 'PUT',
                 url: response.url,
                 headers: { 'Content-Type': file.type },
                 data: file
                }
            // $http.put(response.url, file)
            $http(req)
            .success(function(response) {
              //Finally, We're done
              console.log('Upload Done!')
            })
            .error(function(response) {
              console.log("Error:" + JSON.stringify(response));
            });
        })
    };             
}
 
