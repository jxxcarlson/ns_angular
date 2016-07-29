
// http://docs.aws.amazon.com/sdkforruby/api/Aws/S3/Object.html#presigned_url-instance_method
// http://docs.aws.amazon.com/sdk-for-ruby/latest/DeveloperGuide/aws-ruby-sdk-s3-recipe-set-item-props.html

// http://stackoverflow.com/questions/31590424/cant-upload-files-to-amazon-s3-using-angularjs-with-pre-signed-url
// http://docs.aws.amazon.com/general/latest/gr/signature-version-4.html
// https://github.com/danialfarid/ng-file-upload/wiki/Direct-S3-upload-and-Node-signing-example
// http://stackoverflow.com/questions/34573315/angularjs-image-upload-to-s3

module.exports = function(file) { 

  // Get The PreSigned URL
  $http.post('/presigned',{ filename: file.name, type: file.type })
    .success(function(resp) {
      // Perform The Push To S3
      console.log('foo')
      $http.put(resp.url, file, 
                {headers: {'Content-Type': file.type}}
               )
        .success(function(resp) {
          //Finally, We're done
          alert('Upload Done!')
        })
        .error(function(resp) {
          alert("An Error Occurred Attaching Your File");
        });
    })
    .error(function(resp) {
      alert("An Error Occurred Attaching Your File");
    });

}