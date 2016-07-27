 module.exports =  function($scope, FileUpload){
            $scope.uploadFile = function(){
               var file = $scope.myFile;
               
               console.log('file is ' );
               console.dir(file);
               
               var uploadUrl = "/fileUpload";
               FileUpload.uploadFileToUrl(file, uploadUrl);
            };
         }]);