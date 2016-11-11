module.exports = function($localStorage) {


    // DOCUMENT LIST

    this.documentCount = function() {

        if (this.documentList() == undefined) {

            return 0
        }
        else {

            return this.documentList().length
        }
    }

    // Results of search
    this.setDocumentList = function(array) {

        $localStorage.documentList = array
        $localStorage.currentDocumentList = array
        // $localStorage.documentId = array[0] // XXX: CUIDADO!!
        this.currentDocumentList = array

    }

    this.resetDocumentList = function() {

        this.currentDocumentList = $localStorage.documentList
        // $localStorage.documentId = $localStorage.documentList[0]

    }

    this.clearDocumentList = function() {

        console.log("DEBUG: clearDocumentList")
        $localStorage.documentList = []
        $localStorage.currentDocumentList = []

    }


    this.documentList = function() {

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




    this.setTocTitle = function(title) {

        $localStorage.tocTitle = title
    }


    this.tocTitle = function() {

        return $localStorage.tocTitle || '0. Search Results'
    }

    this.setTocTitlePreferred = function(value) {

        $localStorage.tocTitlePreferred = value
    }

    this.tocTitlePreferred = function() {

        return $localStorage.tocTitlePreferred || ''

    }


    this.tocStyle = function(doc) {

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