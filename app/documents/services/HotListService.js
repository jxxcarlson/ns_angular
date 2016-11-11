module.exports = function($state, $localStorage, UserService, DocumentService, DocumentApiService) {

    this.hotList = function (scope) {


        var value = DocumentService.useHotList()
        console.log('TOGGLE HOTLIST, value = ' + value)
        value = !value
        console.log('1. ** (toggle) value = ' + value)
        this.setUseHotList(value, scope)
        console.log('2. ** (toggle) value = ' + value)

        if (value == true) {

            getHotList(scope)

        } else {

            DocumentService.popDocumentList(scope)
            $state.go('documents', {}, {'reload': true})
        }

    }

   var getHotList = function (scope) {

        var request = 'hotlist/' + UserService.username()

        // DocumentService.stashDocumentList()

        DocumentApiService.getRequest(request, scope)
            .then(function (request) {

                var hotlist = request.data['hotlist']

                console.log('HOTLIST: ' + JSON.stringify(hotlist))
                DocumentService.stashDocumentList()
                DocumentService.setDocumentList(hotlist)
                $state.go('documents', {}, {'reload': true})

            })
    }


    this.setUseHotList = function(value, scope) {

        console.log('^^^ 1, setUseHotList')

        $localStorage.useHotList = value

    }

    this.useHotList = function() {

        return $localStorage.useHotList
    }

    this.stashDocumentList = function() {

        $localStorage.stashedDocumentList = $localStorage.documentList
    }

    this.popDocumentList = function(scope) {

        $localStorage.documentList = $localStorage.stashedDocumentList
        this.setDocumentList($localStorage.documentList)

    }

}