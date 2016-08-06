module.exports = function($localStorage, GlobalService) {
    
    this.setDocumentId = function(id) { $localStorage.documentId = id }
    this.documentId = function() { return $localStorage.documentId }
    
    this.setTitle = function(title) { $localStorage.title = title}
    this.title = function() { return $localStorage.title }
    
    this.setText = function(text) { $localStorage.text = text }
    this.text = function() { return $localStorage.text }
    
    this.setKind= function(kind) { $localStorage.documentKind = kind }
    this.kind = function() { return $localStorage.documentKind }
    
    this.setPublic= function(value) { 
        $localStorage.public = value 
    }
    this.getPublic = function() { return $localStorage.public }
    
    this.setRenderedText = function(renderedText) { $localStorage.renderedText = renderedText}
    this.renderedText = function() { return $localStorage.renderedText }
    
    this.setDocumentList = function(array) {    
        var id
        if ((array == undefined) || (array[0] == undefined)) {
            console.log('document array is empty')
            id = GlobalService.defaultDocumentID()
            array = [id]
        } else {
            console.log('document array: ' + array.length)
            id = array[0]['id']
        }
        $localStorage.documentList = array
        $localStorage.documentId = array[0]
    }
    
    this.documentList = function() { 
        
        return $localStorage.documentList 
    
    }
    
    this.documentCount = function() { return $localStorage.documentList.length }
    
    
    this.update = function(document) {
        
        this.setTitle( document['title'] )
        this.setDocumentId( document['id'] )       
        this.setText( document['text'] )
        this.setRenderedText( document['rendered_text'] )
        this.setKind( document['kind'])
        this.setPublic(document['public'])
        
    }
    
    
    
      
}