module.exports = [
      '$scope',
      '$http',
      '$localStorage',
      function($scope, $http, $localStorage) {
        $scope.submit = function() {

          console.log('CREATE DOCUMENT')
          console.log("create new document: " + $scope.title)

          var access_token = $localStorage.access_token
          console.log("TOKEN: " + String(access_token))

          var parameter = JSON.stringify({title:$scope.title, token:access_token });
          console.log('parameter: ' + parameter);

          $http.post('http://localhost:2300/v1/documents', parameter)
          .then(function(response){
            if (response.data['status'] == 200) {
              $scope.message = 'Success!'
            } else {
              $scope.message = response.data['error']
            }
            console.log('status = ' + String(response.data['status']))
          });


        }
      }
    ]