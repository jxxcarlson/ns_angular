
/*****

CHEYENNE WALLACE: ANGULAR UPLOAD WITH PRESIGNED URL
http://www.cheynewallace.com/uploading-to-s3-with-angularjs-and-pre-signed-urls/

RUBY: UPLOAD WITH PRESIGNED URL
http://docs.aws.amazon.com/AmazonS3/latest/dev/UploadObjectPreSignedURLRubySDK.html#UploadObjectPreSignedURLRubySDKV2

*****/


// http://stackoverflow.com/questions/34573315/angularjs-image-upload-to-s3
// https://aws.amazon.com/console/

// http://docs.aws.amazon.com/general/latest/gr/signature-v4-troubleshooting.html#signature-v4-troubleshooting-key-signing

// AWS in JS >>> http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/browser-examples.html

 module.exports =  function($scope, $http) {

     
     console.log('Image Uploader yada yada!')
        
     
$scope.upload = function (file) {
    console.log("WebUploadCtrl upload");
    console.log("WebUploadCtrl sending S3sign request");
    var query = {
        filename: file.name,
        type: file.type
    };
    $http.post('http://localhost:2300/v1/presigned', query).success(function(response) {
        console.log("UploadCtrl s3sign response received");
        console.log("UploadCtrl URL in repsonse: " + response.url)
        console.log("UploadCtrl upload  response: " + JSON.stringify(response));
        console.log("UploadCtrl FILE size: " + file.length);
        // Perform The Push To S3
        // $http.put(response.url, file, {headers: {'Content-Type': file.type}})
        $http.put(response.url, file)
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
 
/****

$scope.uploadOLD = function(file) { 

       
  console.log('About to upload file ... ')
  // Get The PreSigned URL
  $http.post('http://localhost:2300/v1/presigned',{ filename: file.name, type: file.type })
    .success(function(resp) {
      // Perform The Push To S3
      $http.put(resp.url, file, {headers: {'Content-Type': file.type}})
        .success(function(resp) {
          //Finally, We're done
          alert('Upload Done!')
        })
        .error(function(resp) {
          alert("An Error Occurred Uploading Your File");
        });
    })
    .error(function(resp) {
      alert("Presigned URL could cnot be obtained");
    });

} 
****/