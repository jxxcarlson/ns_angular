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

    this.setIdentifier = function(identifier) { $localStorage.identifier = identifier}
    this.identifier = function() { return $localStorage.identifier }


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

    this.setTags = function(tags) { $localStorage.tags = tags}
    this.tags = function() { return $localStorage.tags  }

    this.setPrintUrl = function(url) { $localStorage.printUrl = url }
    this.printUrl = function() { return $localStorage.printUrl }

    // Subdocuments of current document
    this.setSubdocuments = function(subdocumentArray) { 
        $localStorage.subdocuments = subdocumentArray
    }
    this.subdocuments = function() { return $localStorage.subdocuments || []}
    this.subdocumentCount = function() { return this.subdocuments().length }

    this.setHasSubdocuments = function(value) { $localStorage.hasSubdocuments = value }
    this.hasSubdocuments = function() { return ($localStorage.hasSubdocuments || false)  }
    
    
    /********** Collection Management ***************/
    
    
    // An item is an object with fields id and a title
    this.makeDocumentItem = function(id, title) {
        
        var obj = {}
        obj.id = id
        obj.title = title
        
        return obj
    }
    
    this.setCurrentCollectionItem = function(id, title) { 
        var item = this.makeDocumentItem(id,title)
        $localStorage.currentCollectionItem = item 
    }
    this.currentCollectionItem = function() { return $localStorage.currentCollectionItem }
    
    this.setCurrentDocumentItem = function(id, title) { 
        var item = this.makeDocumentItem(id,title)
        $localStorage.currentDocumentItem = item  
    }
    this.currentDocumentItem = function() { return $localStorage.currentDocumentItem }


    ///////// TOC //////////////////////


    ///////// COLLECTION STACK //////////////////////

    this.resetCollectionStack = function() {
        this.setCurrentCollectionItem(0, '')
        $localStorage.collectionStack = []
    }
    this.collectionStack = function() { return $localStorage.collectionStack || []}
    
    // Return element k steps from the top of the stack
    this.collectionStackPeek = function(k) { 
        
        var n = this.collectionStack().length - k - 1
        
        if (n > -1) {
            
            return this.collectionStack()[n]
        } 
        else
        {
            var item = {}; item.id = 0; item.title = ''
            return item
        }
    }
    this.collectionStackTop = function() { return this.collectionStackPeek(0) }
    this.pushCollectionStack = function(item) { $localStorage.collectionStack.push(item) }
    this.popCollectionStack = function() {

        console.log('rule goUp, before pop: ' + JSON.stringify($localStorage.collectionStack))
        return $localStorage.collectionStack.pop()
        console.log('rule goUp, after pop: ' + JSON.stringify($localStorage.collectionStack))

    }
    
    this.documentIsInDocumentList = function(item) {
        
        var matchId = function(item, listItem) { return (item.id == listItem['id'])}
        
        var matches = this.documentList().filter(
            function(x) { return matchId(item, x) }
        ) || []   
        return (matches.length > 0) 
    }
    
    //XXX
    this.currentDocumentIsTerminal = function() { 

        return (this.subdocuments().length == 0) }
    
    this.isSiblingOfCurrentDocument = function(item) {  }
    
    
    
    this.itemsAreEqual = function(firstItem, secondItem) {
            
            if ((firstItem == undefined) && (secondItem == undefined)) {
                
                return true
            }
            else if ((firstItem == undefined) || (secondItem == undefined)) {
                
                return false
            }
            else
            {
                return (firstItem.id == secondItem.id)
            }
    }
    
    
    this.updateCollectionStack = function() {
        
        var currentItem = this.currentDocumentItem()
        var stackTop = this.collectionStackTop()

        var currentIsTerminal = this.currentDocumentIsTerminal()
        var currentIsInDocumentList = this.documentIsInDocumentList(currentItem)

        var report = function(message) {

            var sts = JSON.stringify($localStorage.collectionStack)
            var nSt = $localStorage.collectionStack.length
            console.log(message + ', N = ' + nSt + ', S = ' + sts )
            
        }
        
        
        if  (this.itemsAreEqual(stackTop, currentItem)) { 
            
           // this.popCollectionStack()
           // report('Rule pop')
        }
        else if ( currentIsTerminal && !currentIsInDocumentList) {
            
            if (!this.itemsAreEqual(currentItem, stackTop)) { 
            
                this.pushCollectionStack(currentItem)
                report('Rule 1')
                
            }    
        }
        else if ( !currentIsTerminal ) {
            
            if (!this.itemsAreEqual(currentItem, stackTop)) { 
            
                this.pushCollectionStack(currentItem)
                report('Rule 2')
                
            }
        }
        else {

            report('Rule no-op')
        }
      
    }

    
    
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
        
        this.setAuthor( document['author'] )
        
        // These are eventually to be eliminated in favor of setDocumentItem
        this.setTitle( document['title'] )
        this.setDocumentId( document['id'] )
        
        this.setCurrentDocumentItem(document['id'], document['title'])
        
        this.setText( document['text'] )
        this.setRenderedText( document['rendered_text'] )
        
        this.setKind( document['kind'])
        this.setPublic(document['public'])
        
        var links = document['links'] || {} 
        var subdocuments = links['documents'] || []
        var tags = document['tags'] || {}

        this.setTags(tags)

        this.setIdentifier(document['identifier'])

        this.setSubdocuments(subdocuments)

        this.setHasSubdocuments(document['has_subdocuments'])
        
        return document['rendered_text']
        
    }
    
    this.params = function(scope) {

        var _params = { 
                    id: this.documentId(), 
                    title: scope.editableTitle, 
                    public: scope.statusPublic,
                    text: scope.editText,
                    author_name: this.author()
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

    this.showThatItHasSubdocuments = function(doc) {

        return doc['has_subdocuments']
    }
    
      
}