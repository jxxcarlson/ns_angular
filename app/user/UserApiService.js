module.exports = function($http, $q, $localStorage, GlobalService) {

        var deferred = $q.defer();
        var apiServer = GlobalService.apiServer()

        this.login = function(username, password) {
          return $http.get('http://' + apiServer + '/v1/users/' + username + '?' + password)
          .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                var data = response.data
                console.log('I updated localStorage with status ' + data['status'] + ' and token ' + data['token'])
                $localStorage.accessToken = data['token']
                $localStorage.loginStatus = data['status']
                $localStorage.username = username
                // promise is returned
                return deferred.promise;
            }, function (response) {
                // the following line rejects the promise
                deferred.reject(response);
                // promise is returned
                return deferred.promise;
            })
        ;
        }
        
        this.newUser = function(username, email, password) {
            
          var parameter = JSON.stringify({username:username, email:email, password: password});
          console.log(parameter);
          return $http.post('http://' + apiServer + '/v1/users/create', parameter)
          
          .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);

                var data = response.data
                console.log('I updated localStorage with status ' + data['status'] + ' and token ' + data['token'])
                $localStorage.accessToken = data['token']
                $localStorage.loginStatus = data['status']
                $localStorage.username = username

                // promise is returned
                return deferred.promise;
            }, function (response) {
                // the following line rejects the promise
                deferred.reject(response);
                // promise is returned
                return deferred.promise;
            })
        ;
        }

      }

