/*****
 headers: { "accesstoken": UserService.accessToken(),
                            "Cache-control": "",
                            "Pragma": "" 
                          }

The purpose of DocumentApiServices is to communicate with the API server,
performing the standard CRUD functons

*****/
module.exports = function($http, $q, $sce, $state, DocumentService, UserService, GlobalService, envService, MathJaxService) {

        var deferred = $q.defer();

        this.getDocument = function(id, queryObj) {
            
          console.log('*** DocApiService: getDocument') 
          
          if (id == undefined) {
              id = GlobalService.defaultDocumentID()
          }
          var url = envService.read('apiUrl') + '/documents/' + id
          var options = { headers: { "accesstoken": UserService.accessToken() }}
          return  $http.get(url, options)
          .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                var data = response.data
                var document = data['document']                
                var links = document['links'] || {} 
                var documents = links['documents'] || [] // JJJJ
                
                // If the document has subdocuments, display them
                // instead of the search results
                if (documents.length > 0) {
                    
                    console.log('*** Setting collecton title: ' + document['title'])
                    DocumentService.setCollectionTitle(document['title'])
                    DocumentService.setCollectionId(document['id'])
                    DocumentService.setCurrentCollectionItem(document['id'], document['title'])
                    
                    DocumentService.setDocumentList( documents )
                } 
                else 
                {
                    // console.log('*** Setting collecton title to NONE')
                    // DocumentService.setCollectionTitle('none')
                }
                
                
                DocumentService.update(document)
                //if (queryObj.toc) { 
                if (true) { 
                    
                    console.log('ucs - Updating collection stack: ' + id)
                    DocumentService.updateCollectionStack() 
                }
                else
                {
                    
                    console.log('ucs - NOT Updating collection stack: ' + id)
                }
                var cdi = DocumentService.currentDocumentItem()
                
                var isInDocList = DocumentService.documentIsInDocumentList(cdi)
                
                // promise is returned
                return deferred.promise;
            }, function (response) {
                 MathJaxService.reload(DocumentService.kind(), 'DocumentApiService, getDocument')
              
                // the following line rejects the promise
                deferred.reject(response);
                // promise is returned
                return deferred.promise;
            })
        }
        
        
        this.search = function(searchText) {
               
            var url = envService.read('apiUrl') + '/documents' + '?' + $scope.searchText
            var options = { headers: { "accesstoken": UserService.accessToken() }}
            return  $http.get(url, options)
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

    this.printDocument = function(id, queryObj) {

        var url = envService.read('apiUrl') + '/printdocument/' + id
        var options = { headers: { "accesstoken": UserService.accessToken() }}
        return  $http.get(url, options)
            .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                var jsonData = response.data
                var url = jsonData['url']
                DocumentService.setPrintUrl(url)
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

            console.log('API, DOCUMENT, UPDATE')

            var deferredRefresh = $q.defer();
     
            var parameter = JSON.stringify(params);
            var url = envService.read('apiUrl') + '/documents/' + params['id']
            var options = { headers: { "accesstoken": UserService.accessToken() }}
            
            $http.post(url, parameter, options)
                .then(function(response){
                
                    console.log('  -- status: ' + response.data['status'])
                    if (response.data['status'] == 'success') {
                        
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
                    MathJaxService.reload(DocumentService.kind(), 'AAAA: ')
                }, function(response) {
                    deferred.reject(response);
                     console.log('BBBB')
                })
            
        }


    this.move_subdocument = function(parent_id, subdocument_id, command, scope) {

        // command is 'move_up' or 'move_down'

        console.log('API, DOCUMENT, MOVE SUBDOCUMENT')


        var deferredRefresh = $q.defer();

        var parameter = JSON.stringify({author_name: DocumentService.author()});
        var url = envService.read('apiUrl') + '/documents/' + parent_id + '?' + command + '=' + subdocument_id
        var options = { headers: { "accesstoken": UserService.accessToken() }}

        console.log('MOVE: url = ' + url)

        $http.post(url, parameter, options)
            .then(function(response){

                console.log('  -- status: ' + response.data['status'])
                if (response.data['status'] == 'success') {

                    var document = response.data['document']
                    var links = document['links'] || {}
                    var documents = links['documents'] || []
                    if (documents.length > 0) {

                        console.log('*** Setting collecton title: ' + document['title'])
                        DocumentService.setCollectionTitle(document['title'])
                        DocumentService.setCollectionId(document['id'])
                        DocumentService.setCurrentCollectionItem(document['id'], document['title'])

                        DocumentService.setDocumentList( documents )
                    }

                    /* Update $scope */
                    scope.title = document['title']
                    scope.renderedText = function() { return $sce.trustAsHtml(document['rendered_text']); }
                    scope.message = 'Success!'

                    /* Update local storage */
                    DocumentService.update(document)
                    $state.go('editdocument', {}, {reload:true})

                } else {
                    scope.message = response.data['error']
                }

            }).then(
            function(response) {
                deferredRefresh.resolve(response)
                console.log('AAAA: ' + JSON.stringify(response))

                MathJaxService.reload(DocumentService.kind(), 'AAAA: ')
            }, function(response) {
                deferred.reject(response);
                console.log('BBBB')
            })

    }
        

}