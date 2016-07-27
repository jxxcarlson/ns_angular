// UPLOAD TO S3: http://www.cheynewallace.com/uploading-to-s3-with-angularjs-and-pre-signed-urls/

module.exports = function() {
  return {
    restrict: 'AE',
    scope: {
      file: '@'
    },
    link: function(scope, el, attrs){
      el.bind('change', function(event){
        var files = event.target.files;
        var file = files[0];
        scope.file = file;
        scope.$parent.file = file;
        scope.$apply();
      });
    }
  };
}

