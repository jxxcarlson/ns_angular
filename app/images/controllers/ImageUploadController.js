 // module.exports =  function(){

 module.exports =  function($scope, $http){
// module.exports =  function($scope){
     
     console.log('Image Uploader yada yada!')
     
$scope.upload = function(file) { 

       
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
     
$scope.uploadXX = function (file) {
    console.log("WebUploadCtrl upload");
    console.log("WebUploadCtrl sending S3sign request");
    var query = {
        filename: file.name,
        type: file.type
    };
    $http.post('http://localhost:2300/v1/presigned', query).success(function(response) {
        console.log("WebUploadCtrl s3sign response received");
        var s3ResponseParams = response;
        console.log("WebUploadCtrl upload  AWSAccessKeyId: " + response.AWSAccessKeyId);
        console.log("WebUploadCtrl upload  signature: " + response.Signature);
        $scope.upload = Upload.upload({
                url: s3ResponseParams.url, //s3Url
                transformRequest: function(data, headersGetter) {
                    var headers = headersGetter();
                    delete headers.Authorization;
                    return data;
                },
                fields: s3ResponseParams.fields, //credentials
                method: 'POST',
                file: file
            }).progress(function(evt) {
                $scope.progressPerCent = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + $scope.progressPerCent);
            }).success(function(data, status, headers, config) {
                // file is uploaded successfully
                console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);                

            }).error(function() {
                // Some error has occured
                console.log('Error uploading to S3');
          });
    });
};     

 
            
            
}