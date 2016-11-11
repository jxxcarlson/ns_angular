module.exports = function($localStorage) {


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