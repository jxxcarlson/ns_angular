
    /*
    REFERENCE: https://github.com/gsklee/ngStorage

    For example, URL’s like /route/12345?a=2&b=3 will match the route /route
    with id 12345 and query string variables a & b. Now those values can
    be accessed in controller code using $routeParams service. Any parameter
    [preceded by ':'] in route can be accessed in controller by it’s name
    using $routeParams.paramName. Additionally, any query string passed
    in URL can be accessed in controller using $routeParams.variableName
    */
    module.exports = [
      '$scope',
      '$localStorage',
      '$routeParams',
      '$http',
      '$sce',

      function($scope, $localStorage, $routeParams, $http, $sce ) {

        var id;
        if ($routeParams.id != undefined) {
            id = $routeParams.id
        } else {
            id = $localStorage.currentDocumentID;
        }
        /* Initial values: */
        $scope.text = $localStorage.text
        $scope.renderedText = function() { return $sce.trustAsHtml($localStorage.rendered_text); }
        $scope.docArray = $localStorage.documents

        $scope.reloadMathJax = function () { MathJax.Hub.Queue(["Typeset", MathJax.Hub]); console.log("reloadMathJax called"); }

        console.log('Document id: ' + id)

        $http.get('http://localhost:2300/v1/documents/' + id  )
        .then(function(response){
          var document = response.data['document']
          $scope.title = document['title']
          $scope.text = document['text']
          $scope.renderedText = function() { return $sce.trustAsHtml(document['rendered_text']); }

          $localStorage.currentDocumentID = document['id']
          $localStorage.title = $scope.title
          $localStorage.text = $scope.text
          $localStorage.renderedText = document['rendered_text']

        });
    }]