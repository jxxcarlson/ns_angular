module.exports = function($http, $q, $sce, DocumentService, UserService, GlobalService, MathJaxService) {

        var deferred = $q.defer();
        var apiServer = GlobalService.apiServer()

        this.getDocument = function(id) {
          if (id == undefined) {
              id = GlobalService.defaultDocumentID()
          }
          return  $http.get('http://' + GlobalService.apiServer() + '/v1/documents/' + id  )
          .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                var data = response.data
                var document = data['document']
                DocumentService.update(document)
        
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
               
          return  $http.get('http://' + apiServer + '/v1/documents' + '?' + $scope.searchText  )
          .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
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
        
        
        
        this.update = function(params, scope) {

            var deferredRefresh = $q.defer();
            params['token'] = UserService.accessToken()

            var parameter = JSON.stringify(params);
            
            console.log('DocumentApiService, update, parameter: ' + parameter)

            $http.post('http://' + apiServer + '/v1/documents/' + params['id'], parameter)
                .then(function(response){
                
                    if (response.data['status'] == '202') {
                        
                        var document = response.data['document']
                        
                        /* Update $scope */
                        scope.title = document['title']
                        scope.renderedText = function() { return $sce.trustAsHtml(document['rendered_text']); }
                        scope.message = 'Success!'

                        /* Update local storage */
                        DocumentService.update(document)
                 
                    } else {
                        scope.message = response.data['error']
                    }

                }).then( 
                function(response) {
                    deferredRefresh.resolve(response)
                    console.log('AAAA: ' + JSON.stringify(response))
                    MathJaxService.reload('AAAA: ')
                }, function(response) {
                    deferred.reject(response);
                     console.log('BBBB')
                })
            
        }
        

      }