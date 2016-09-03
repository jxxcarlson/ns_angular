module.exports = function ($http, $q, $localStorage, envService, UserService) {

    var deferred = $q.defer();

    this.login = function (username, password) {
        return $http.get(envService.read('apiUrl') + '/users/' + username + '?' + password)
            .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                var data = response.data
                console.log('I updated localStorage with status ' + data['status'] + ' and token ' + data['token'])
                $localStorage.accessToken = data['token']
                $localStorage.loginStatus = data['status']
                $localStorage.username = username
                $localStorage.user_id = data['user_id']
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

    this.newUser = function (username, email, password) {

        var parameter = JSON.stringify({username: username, email: email, password: password});
        console.log(parameter);
        return $http.post(envService.read('apiUrl') + '/users/create', parameter)

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

    this.getPreferences = function(username, controller) {

        return $http.get(envService.read('apiUrl') + '/get_preferences/' + UserService.username())

            .then(function (response) {

                var data = response.data
                UserService.setPreferences(data['preferences'])

            })

    }

    this.updatePreferences = function (key, value) {


        UserService.setPreference(key, value)
        var command = key + '=' + value
        var username = UserService.username()

        // var email = UserService.email()

        // var parameter = JSON.stringify({username: username, email: email, password: password});
        var parameter = {}
        console.log(parameter);
        return $http.post(envService.read('apiUrl') + '/update_preferences/' + username + '?' + command, parameter)

            .then(function (response) {


            }, function (response) {

            })

    }


}

