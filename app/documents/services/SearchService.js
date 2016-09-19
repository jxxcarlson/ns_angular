module.exports = function ($http, $sce, $state, $location, $q,
                           DocumentService, envService, UserService, QueryParser) {

    console.log('SSS, enter SEARCH SERVICE')

    this.query = function (searchText, scope, destination) {

        console.log('SSS -- query: ' + searchText)

        var queryText = QueryParser.parse(searchText)

        var url = envService.read('apiUrl') + '/documents' + '?' + queryText
        var options = {headers: {"accesstoken": UserService.accessToken()}}
        return $http.get(url, options)
            .then(function (response) {

                var jsonData = response.data
                var documents = jsonData['documents']
                var firstDocument = jsonData['first_document']

                console.log('SSS; SearchController, first document: ' + JSON.stringify(firstDocument))

                DocumentService.setDocumentList(documents)


                if (firstDocument == undefined) {

                    console.log('ERROR: firstDocument not defined')

                } else {

                    DocumentService.update(firstDocument)
                }


                var currentDocument = DocumentService.document()

                var dataValid = (currentDocument.id == firstDocument.id)

                console.log('SSS: data is valid = ' + dataValid)

                $location.path('documents/' + currentDocument.id + '?toc')
                $state.go('documents', {}, {reload: true})


            })
    }
}