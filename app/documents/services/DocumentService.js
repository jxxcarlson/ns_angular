module.exports = function($localStorage, GlobalService) {
    
    
    /**********
    
    State variables:
    
        documentId
        title
        text
        renderedText
        documentKind
        public
        
        documentList
        documentCount
    
    
    ***********/
    
    this.setDocumentId = function(id) { $localStorage.documentId = id }
    this.documentId = function() { return $localStorage.documentId }
    
    this.setTitle = function(title) { $localStorage.title = title}
    this.title = function() { return $localStorage.title }
    
    this.setAuthor = function(author) { $localStorage.author = author}
    this.author = function() { return $localStorage.author }
    
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
        console.log('array:::: ' + array)
        console.log('document array: ' + array.length)
        // id = array[0]['id']
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
        
        return document['rendered_text']
        
    }
    
    this.params = function(scope) {
        
        var _params = { 
                    id: this.documentId(), 
                    title: scope.editableTitle, 
                    public: scope.statusPublic,
                    text: scope.editText 
                 }
        
        return _params
    }
    
    this.clear = function() {
        
        $localStorage.title = ''
        $localStorage.documentId = ''
        $localStorage.text = ''
        $localStorage.renderedText = ''
        $localStorage.kind = ''
        $localStorage.public = false
        
        $localStorage.documentList = []
        $localStorage.documentCount = 0       
    }
    
   this.tocStyle = function(doc) { 
        var css = {}
        if (doc['id'] == $localStorage.documentId ) {
            css["background-color"] = "#fee"
        }
        if (doc['public'] == true ) {
            css["font-style"] = "italic"
        }
        return css
    }  
    
      
}