module.exports = function( $parse ) {
   return {
       restrict: 'A',
       link: function( $scope, elem, attrs ) {
          elem.ready(function(){
            $scope.$apply(function(){
                console.log('EXECUTING ELEMENT READY')
                var func = $parse(attrs.elemReady);
                func($scope);
            })
          })
       }
    }
}