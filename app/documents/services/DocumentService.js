module.exports = function($localStorage) {
    
    this.setDocumentId = function(id) { $localStorage.documentId = id }
    this.documentId = function() { return $localStorage.documentId }
    
    this.setTitle = function(title) { $localStorage.title = title}
    this.title = function() { return $localStorage.title }
    
    this.setText = function(text) { $localStorage.text = text }
    this.text = function() { return $localStorage.text }
    
    this.setRenderedText = function(renderedText) { $localStorage.renderedText = renderedText}
    this.renderedText = function() { return $localStorage.renderedText }
    
    this.setDocumentList = function(array) { 
        $localStorage.documentList = array
        var id = array[0]['id']
        console.log('FIRST ELEMENT = ' + JSON.stringify(array[0]))
        console.log('ID OF FIRST ELEMENT = ' + id)
        $localStorage.documentId = id
    }
    this.documentList = function() { return $localStorage.documentList }
    
    this.documentCount = function() { return $localStorage.documentList.length }
       
}