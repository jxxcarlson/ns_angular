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
            
            
}