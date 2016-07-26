module.exports = function($http, $q, DocumentService) {

        var deferred = $q.defer();

        this.getDocument = function(id) {
          return  $http.get('http://localhost:2300/v1/documents/' + id  )
          .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                var data = response.data
                var document = data['document']
                console.log('I updated localStorage for ' + document['title'])
                DocumentService.setTitle( document['title'] )
                DocumentService.setDocumentId( document['id'] )
                
                DocumentService.setText( document['text'] )
                DocumentService.setRenderedText( document['rendered_text'] )
                // promise is returned
                return deferred.promise;
            }, function (response) {
                // the following line rejects the promise
                deferred.reject(response);
                // promise is returned
                return deferred.promise;
            })
        }
        
        
        this.search = function(searchText) {
          return  $http.get('http://localhost:2300/v1/documents' + '?' + $scope.searchText  )
          .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                console.log(response.data['status'])
                console.log('Number of documents: ' + response.data['document_count'])
                var jsonData = response.data
                var documents = jsonData['documents']
                DocumentService.setDocumentList( documents )
                // promise is returned
                return deferred.promise;
            }, function (response) {
                // the following line rejects the promise
                deferred.reject(response);
                // promise is returned
                return deferred.promise;
            })
        }
        
        
        
        /*
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
        */

      }