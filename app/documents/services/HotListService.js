module.exports = function($state, $localStorage, UserService, DocumentService, TableOfContentsService, DocumentApiService) {


    var self = this


    self.setUseHotList = function(value, scope) {

        console.log('^^^ 1, setUseHotList')

        $localStorage.useHotList = value

    }

    self.useHotList = function() {

        return $localStorage.useHotList
    }

    self.stashDocumentList = function() {

        $localStorage.stashedDocumentList = $localStorage.documentList
    }

    self.popDocumentList = function(scope) {

        $localStorage.documentList = $localStorage.stashedDocumentList
        TableOfContentsService.setDocumentList($localStorage.documentList)

    }

    self.hotList = function (scope) {


        var value = self.useHotList()
        console.log('TOGGLE HOTLIST, value = ' + value)
        value = !value
        console.log('1. ** (toggle) value = ' + value)
        self.setUseHotList(value, scope)
        console.log('2. ** (toggle) value = ' + value)

        if (value == true) {

            getHotList(scope)

        } else {

            self.popDocumentList(scope)
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
                self.stashDocumentList()
                TableOfContentsService.setDocumentList(hotlist)
                $state.go('documents', {}, {'reload': true})

            })
    }



}