// http://stackoverflow.com/questions/34573315/angularjs-image-upload-to-s3
// https://aws.amazon.com/console/

// http://docs.aws.amazon.com/general/latest/gr/signature-v4-troubleshooting.html#signature-v4-troubleshooting-key-signing

 module.exports =  function($scope, $http, Upload) {

     
     console.log('Image Uploader yada yada!')
        
     
$scope.upload = function (file) {
    console.log("WebUploadCtrl upload");
    console.log("WebUploadCtrl sending S3sign request");
    var query = {
        filename: file.name,
        type: file.type
    };
    $http.post('http://localhost:2300/v1/presigned', query).success(function(response) {
        console.log("WebUploadCtrl s3sign response received");
        var s3ResponseParams = response;
        console.log("WebUploadCtrl s3Url, url: " + s3ResponseParams.url)
        console.log("WebUploadCtrl s3Url, fields: " + s3ResponseParams.fields)
        console.log("WebUploadCtrl upload  AWSAccessKeyId: " + response.AWSAccessKeyId);
        console.log("WebUploadCtrl upload  AWSSecretAccessKey: " + response.AWSSecretAccessKey);
        console.log("WebUploadCtrl upload  signature: " + response.Signature);
        console.log("WebUploadCtrl upload  response: " + JSON.stringify(response));
        $scope.upload = Upload.upload({
                url: s3ResponseParams.url, //s3Url
                // headers : {'Content-Type': file.type},
                transformRequest: function(data, headersGetter) {
                    // var headers = headersGetter();
                    var headers = {'Content-Type': file.type};
                    delete headers.Authorization;
                    return data;
                },
                fields: s3ResponseParams.fields, //credentials
                method: 'PUT',
                file: file
            }).progress(function(evt) {
                $scope.progressPerCent = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + $scope.progressPerCent);
            }).success(function(data, status, headers, config) {
                // file is uploaded successfully
                console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);                

            }).error(function(error) {
                // Some error has occured
                console.log('Error uploading to S3');
                console.log('Error: ' + JSON.stringify(error));
          });
    });
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