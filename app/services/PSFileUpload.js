module.exports = function(file) { 

  // Get The PreSigned URL
  $http.post('/presigned',{ filename: file.name, type: file.type })
    .success(function(resp) {
      // Perform The Push To S3
      $http.put(resp.url, file, {headers: {'Content-Type': file.type}})
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