module.exports = function ($http, $sce, $state, $location, $q,
                           DocumentService, envService, UserService, QueryParser) {

    console.log('SSS, enter SEARCH SERVICE')

    this.query = function (searchText, scope, destination) {

        console.log('DEBUG -- query: ' + searchText)
        console.log('DEBUG -- destination: ' + destination)

        var queryText = QueryParser.parse(searchText)

        var url = envService.read('apiUrl') + '/documents' + '?' + queryText
        var options = {headers: {"accesstoken": UserService.accessToken()}}
        return $http.get(url, options)
            .then(function (response) {

                var jsonData = response.data
                var documents = jsonData['documents']
                var firstDocument = jsonData['first_document']

                console.log('DEBUG, number of documents: ' + documents.length)
                if (documents.length > 0) {
                    console.log('DEBUG, first documents id: ' + documents[0]['id'])
                }


                DocumentService.setDocumentList(documents)


                if (firstDocument == undefined) {

                    console.log('ERROR: firstDocument not defined')

                } else {

                    DocumentService.update(firstDocument)
                }


                var currentDocument = DocumentService.document()

                var dataValid = (currentDocument.id == firstDocument.id)

                console.log('SSS: data is valid = ' + dataValid)




                if (destination == 'editdocument') {

                    console.log('GO: editdocument')
                    $location.path('editdocument/' + currentDocument.id + '?toc')
                    $state.go('editdocument', {}, {reload: true})

                } else {

                    console.log('GO: documents')
                    if (documents.length > 0) {
                        var id = documents[0]['id']
                        $state.go('documents', {id: id}, {reload: true})
                    } else {
                        $state.go('documents', {}, {reload: true})
                    }



                }



            })
    }
}