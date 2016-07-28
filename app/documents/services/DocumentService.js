module.exports = function($localStorage) {
    
    this.setDocumentId = function(id) { $localStorage.documentId = id }
    this.documentId = function() { return $localStorage.documentId }
    
    this.setTitle = function(title) { $localStorage.title = title}
    this.title = function() { return $localStorage.title }
    
    this.setText = function(text) { $localStorage.text = text }
    this.text = function() { return $localStorage.text }
    
    this.setKind= function(kind) { $localStorage.documentKind = kind }
    this.kind = function() { return $localStorage.documentKind }
    
    this.setRenderedText = function(renderedText) { $localStorage.renderedText = renderedText}
    this.renderedText = function() { return $localStorage.renderedText }
    
    this.setDocumentList = function(array) { 
        $localStorage.documentList = array
        var id = array[0]['id']
        console.log('FIRST ELEMENT = ' + JSON.stringify(array[0]))
        console.log('ID OF FIRST ELEMENT = ' + id)
        $localStorage.documentId = id
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
        
    }
    
    this.reloadMathJax = function(documentKind) {
        
        // if ($localStorage.documentKind == 'asciidoctor-latex') {
        // if (this.kind() == 'asciidoctor-latex') {
        if (true) {
        // if (documentKind == 'asciidoctor-latex') {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub]); 
                console.log("XX DOC CONTROLLER: reloadMathJax called");  
        }
    }
      
}