 // module.exports =  function(){

 module.exports =  function($scope, FileUpload){
// module.exports =  function($scope){
     
     console.log('Image Uploader yada yada!')

            $scope.uploadFile = function(){
                
            console.log('HERE IS THE FILE UPLOADER FUNCTION')
               var file = $scope.myFile;
               
               console.log('file is ' );
               console.dir(file);
               
               var uploadUrl = "/fileUpload";
               FileUpload.uploadFileToUrl(file, uploadUrl);
            };
            
            
         }