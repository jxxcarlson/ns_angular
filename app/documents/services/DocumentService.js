module.exports = function($localStorage) {
    
    
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
    
    
    
    
    
    // Subdocuments of current document
    this.setSubdocuments = function(subdocumentArray) { 
        $localStorage.subdocuments = subdocumentArray
    }
    this.subdocuments = function() { return $localStorage.subdocuments || []}
    this.subdocumentCount = function() { return this.subdocuments().length }
    
    
    // Results of search
    this.setDocumentList = function(array) { 
        $localStorage.documentList = array
        $localStorage.documentId = array[0]
    }
    this.documentList = function() { 
        
        return $localStorage.documentList 
    
    }
    this.documentCount = function() { 
        
        if ($localStorage.documentList == undefined) {
            
            return 0
        }
        else {
            
            return $localStorage.documentList.length
        }    
    }
    
    
    // Collection
    
    // Collection title
    this.setCollectionTitle = function(collectionTitle) {
        
        $localStorage.collectionTitle = collectionTitle 
    }
    this.collectionTitle = function() { return $localStorage.collectionTitle }
    
    // Collection id
    this.setCollectionId = function(id) {
        
        $localStorage.collectionId = id 
    }
    this.collectionId = function() { return $localStorage.collectionId }
    
    
    // Update
    
    this.update = function(document) {
        
        console.log('Document Service, update, with title = ' + document['title'])
        
        this.setAuthor( document['author'] )
        this.setTitle( document['title'] )
        this.setDocumentId( document['id'] )  
        
        this.setText( document['text'] )
        this.setRenderedText( document['rendered_text'] )
        
        this.setKind( document['kind'])
        this.setPublic(document['public'])
        
        var links = document['links'] || {} 
        var subdocuments = links['documents'] || []
        
        this.setSubdocuments(subdocuments)
        
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