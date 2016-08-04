module.exports = function($http, $q, $sce, DocumentService, UserService, GlobalService) {

        var deferred = $q.defer();
        var apiServer = GlobalService.apiServer()

        this.getDocument = function(id) {
          console.log('DocumentApiService.getDocument, id: ' + id)
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
          console.log('DocumentApiService.search')      
          return  $http.get('http://' + apiServer + '/v1/documents' + '?' + $scope.searchText  )
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
        
        
        
        this.update = function(id, title, text, scope) {

            var parameter = JSON.stringify({id:id, title: title, text:text, token: UserService.accessToken() });

            $http.post('http://' + apiServer + '/v1/documents/' + id, parameter)
                .then(function(response){
                    var rt;
                    if (response.data['status'] == '202') {
                        var document = response.data['document']

                        /* Update local storage */
                        DocumentService.setDocumentId(document['id'])
                        DocumentService.setTitle(document['title'])
                        DocumentService.setText(document['text'])                          
                        DocumentService.setRenderedText(document['rendered_text'])

                        /* Update $scope */
                        scope.title = document['title']
                        scope.renderedText = function() { return $sce.trustAsHtml(document['rendered_text']); }
                        scope.message = 'Success!'
                        
                        
                        // XX: Is this needed?
                        

                    } else {
                        scope.message = response.data['error']
                    }

                    console.log('status = ' + String(response.data['status']))

                })
        }

      }