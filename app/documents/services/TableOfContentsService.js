module.exports = function($localStorage) {

    var self = this


    var state = $localStorage.tocState ||
        {
            tocHeading: 'Search Results',
            useHotList: 'no',
            mode: 'search' // search, toc, hotlist
        }


    self.setMode = function(mode) {

        state.mode = mode
        console.log('Refactor: state.mode = ' + mode)
    }

    self.documentCount = function() {

        if (this.documentList() == undefined) {

            return 0
        }
        else {

            return this.documentList().length
        }
    }

    // Results of search
    self.setDocumentList = function(array) {

        $localStorage.documentList = array
        $localStorage.currentDocumentList = array
        // $localStorage.documentId = array[0] // XXX: CUIDADO!!
        this.currentDocumentList = array

    }

    self.resetDocumentList = function() {

        this.currentDocumentList = $localStorage.documentList
        // $localStorage.documentId = $localStorage.documentList[0]

    }

    self.clearDocumentList = function() {

        console.log("DEBUG: clearDocumentList")
        $localStorage.documentList = []
        $localStorage.currentDocumentList = []

    }


    self.documentList = function() {

        if (this.currentDocumentList == undefined) {

            if ($localStorage.currentDocumentList == undefined) {

                return []

            } else {

                return $localStorage.currentDocumentList
            }
        }
        else {

            if (this.currentDocumentList.length == 0) {

                return $localStorage.currentDocumentList

            } else {

                return this.currentDocumentList
            }


        }


    }




    self.setTocTitle = function(title) {

        state.title = title

        console.log('Refactor, set title = ' + title)

        $localStorage.tocState = state
    }


    self.tocTitle = function() {

        console.log('Refactor, title = ' + state.title)

        switch(state.mode) {
            case 'search':
                state.tocHeading = 'Search results'
                break;
            default:state.tocHeading = 'Contents'
        }

        return state.tocHeading
    }

    self.setTocTitlePreferred = function(title) {

        state.preferredTitle = title

        console.log('Refactor, set title = ' + title)

        $localStorage.tocState = state
    }

    self.tocTitlePreferred = function() {

        return state.preferredTitle

    }


    self.tocStyle = function(doc) {

        var currentDocumentId = $localStorage.currentDocumentItem.id
        var css = {}

        if (doc['id'] == currentDocumentId) {
            css["background-color"] = "#ddf"
        }
        if (doc['public'] == true ) {
            css["font-style"] = "italic"
        }
        if (doc['checked_out_to'] != '' && doc['checked_out_to'] != undefined) {
            css["background-color"] = "#fdd"
        }
        if (doc['checked_out_to'] != '' && doc['checked_out_to'] != undefined && doc['id'] == currentDocumentId ) {
            css["background-color"] = "#fbb"
        }
        if (doc['checked_out_to'] != '' && doc['checked_out_to'] != undefined && doc['author'] == UserService.username() ) {
            css["background-color"] = "#dfd"
        }
        if (doc['checked_out_to'] != '' && doc['checked_out_to'] != undefined && doc['author'] == UserService.username() && doc['id'] == currentDocumentId  ) {
            css["background-color"] = "#8f8"
        }

        return css
    }
}