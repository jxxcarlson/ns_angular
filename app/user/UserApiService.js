module.exports = function($http, $q, $localStorage) {

        var deferred = $q.defer();

        this.login = function(username, password) {
          return $http.get('http://localhost:2300/v1/users/' + username + '?' + password)
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
          return $http.post('http://localhost:2300/v1/users/create', parameter)
          
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


  /*
       REFERENCES (PROMISES)
       http://wildermuth.com/2013/8/3/JavaScript_Promises
       http://liamkaufman.com/blog/2013/09/09/using-angularjs-promises/
       https://docs.angularjs.org/api/ng/service/$q
       
       NOTE: for requests to the server to succeed, one needs
       the proper entry in apps/application.rb of the Hanami server corde:
       
       module Api
        class Application < Hanami::Application
            configure do
                # https://gitter.im/hanami/chat/archives/2016/02/12
                # Include gem 'rack-cors', :require => 'rack/cors'
                middleware.use Rack::Cors do
                    allow do
                        origins 'localhost:4000', '127.0.0.1:4000', '0.0.0.0:9000'
                        resource '*', headers: :any, methods: [:get, :post, :patch, :options]
                    end
                end
              ........
    */