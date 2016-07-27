// http://www.tutorialspoint.com/angularjs/angularjs_upload_file.htm

module.exports = function ($http) {
    

    this.uploadFileToUrl = function(file, uploadUrl){
       var fd = new FormData();
       fd.append('file', file);

       $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
       })

       .success(function(){
       })

       .error(function(){
       });
    }
    

    
 }