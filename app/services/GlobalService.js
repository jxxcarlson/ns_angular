module.exports = function() {

    // this.clientServer = function() { return "localhost:3000" }
    // this.apiServer = function() { return "localhost:2300"}

    this.defaultDocumentID = function () {
        return 11
    }
    this.defaultDocumentHash = function () {
        return {
            "id": 11, "title": "Oops!",
            "text": "Sorry, could not find that document",
            "rendered_text": "Sorry, could not find that document",
            "links": {}
        }
    }
}

