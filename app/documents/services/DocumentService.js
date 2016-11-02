module.exports = function($localStorage, UserService) {
    
    
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


    this.parentId = function() {


        var links = this.document().links
        var parent = links.parent || {}
        if (parent == {}) {

            return 0

        } else {

            return parent.id

        }

    }

    this.setPermissions = function(permissions) {

        console.log('DEBUG: in Document Service, setPermissions, permissions = ' + permissions)

        $localStorage.permissions = permissions
    }


    this.permissions = function() {

        return $localStorage.permissions
    }

    this.setCheckedOutTo = function(value) {

        $localStorage.checkeOutTo = value
    }

    this.checkedOutTo = function() {

        return $localStorage.checkeOutTo
    }




    this.setCanShowSource = function(value) {

        $localStorage.canShowSource = value
    }

    this.canShowSource = function() {

        return $localStorage.canShowSource
    }

    this.documentId = function() {
        var id = this.currentDocumentItem().id
        console.log('*** NOTE! this.documentId = ' + id)
        return id
    }
    
    this.setTitle = function(title) { $localStorage.title = title}
    this.title = function() { return this.document().title }


    this.setIdentifier = function(identifier) { $localStorage.identifier = identifier}
    this.identifier = function() { return this.document().identifier }


    this.setAuthor = function(author) { $localStorage.author = author}
    this.author = function() { return this.document().author }
    
    this.setText = function(text) { $localStorage.text = text }
    this.text = function() { return this.document().text }
    
    this.setKind = function(kind) { $localStorage.documentKind = kind }
    this.kind = function() { return $localStorage.documentKind }
    
    this.setPublic= function(value) { 
        $localStorage.public = value 
    }
    this.getPublic = function() {

        // getPublic is called by the DocumentsController
        // Under certain circumstances this call comes
        // before this.document() is defined 
        if (this.document() == undefined) {

            return false

        } else {

            return this.document().public

        }


    }
    
    this.setRenderedText = function(renderedText) { $localStorage.renderedText = renderedText}
    this.renderedText = function() { return this.document().renderedText }

    this.setTags = function(tags) { $localStorage.tags = tags}
    this.tags = function() { return  this.document().tags  }

    this.setPrintUrl = function(url) { $localStorage.printUrl = url }
    this.printUrl = function() { return this.document().printUrl }

    this.setLatexExportUrl = function(url) { $localStorage.latexExportUrl = url; console.log('****   setLatexExportUrl: '+ url) }
    this.latexExportUrl = function() { return this.document().latexExportUrl }

    this.putBackup = function(data) {

        $localStorage.backupText = data['backup_text']
        $localStorage.backupNumber = data['backup_number']
        $localStorage.backupDate = data['backup_date']
    }

    this.getBackupText = function(text) {

        return $localStorage.backupText
    }

    this.getBackupNumber = function() {

        return $localStorage.backupNumber
    }

    this.getBackupDate = function() {

        return $localStorage.backupDate
    }

    //// SPECIAL (JJJJ) ////
    // Subdocuments of current document
    this.setSubdocuments = function(subdocumentArray) { 
        $localStorage.subdocuments = subdocumentArray
    }
    this.subdocuments = function() { return $localStorage.subdocuments || []}
    this.subdocumentCount = function() { return this.subdocuments().length }

    this.setHasSubdocuments = function(value) { $localStorage.hasSubdocuments = value }
    this.hasSubdocuments = function() { return ($localStorage.hasSubdocuments || false)  }

    this.setAttachmentUrl = function(url) {

        $localStorage.attachmentUrl = url
    }

    this.attachmentUrl = function() {

        return $localStorage.attachmentUrl
    }


    
    
    // An item is an object with fields id and a title
    this.makeDocumentItem = function(id, title) {
        
        var obj = {}
        obj.id = id
        obj.title = title
        
        return obj
    }

    this.setCurrentDocumentItem = function(id, title) { 
        var item = this.makeDocumentItem(id,title)
        $localStorage.currentDocumentItem = item  
    }
    this.currentDocumentItem = function() { return $localStorage.currentDocumentItem }
    

    this.documentCount = function() { 
        
        if (this.documentList() == undefined) {
            
            return 0
        }
        else {
            
            return this.documentList().length
        }    
    }
    


    /// BEGIN MAIN STRUCTURE (JJJJ) ///

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



    this.setUseHotList = function(value, scope) {

        console.log('^^^ 1, setUseHotList')


        $localStorage.useHotList = value

        if (value == false) {

            if (scope.tocTitlePreferred != undefined) {

                scope.tocTitle = scope.tocTitlePreferred

            } else {

                scope.tocTitle = 'Contents'
            }
        }


    }

    this.setTocTitlePreferred = function(value) {

        console.log('TOCTITLE PREFERRED, set to ' + value)

        $localStorage.tocTitlePreferred = value
    }

    this.tocTitlePreferred = function() {

       return $localStorage.tocTitlePreferred || ''

    }


    this.useHotList = function() {

        return $localStorage.useHotList
    }

    this.stashDocumentList = function() {

        $localStorage.stashedDocumentList = $localStorage.documentList
    }

    this.popDocumentList = function(scope) {

        $localStorage.documentList = $localStorage.stashedDocumentList
        this.setDocumentList($localStorage.documentList)

    }

    this.document = function() {

        if (this.currentDocument == undefined) {

            return $localStorage.currentDocument
        }
        else {

            return this.currentDocument

        }
    }

    // Update
    
    this.update = function(document) {

        console.log('Document Service, update')

        if (document == undefined) {

            console.log('WARNING: document is undefined')

            return
        }

        this.currentDocument = document

        $localStorage.currentDocument = document
        
        this.setAuthor(document['author'] )
        
        // These are eventually to be eliminated in favor of setDocumentItem
        this.setTitle( document['title'] )
        this.setCurrentDocumentItem(document['id'], document['title'])
        this.setText( document['text'] )
        this.setRenderedText( document['rendered_text'] )
        this.setKind( document['kind'])
        this.setPublic(document['public'])
        
        var links = document['links'] || {}
        var subdocuments = links['documents'] || []
        var resources = links['resources']
        if (resources != undefined) {

            var media_attachment  = resources['media_attachment']

            if (media_attachment != undefined) {

                var attachmentUrl = media_attachment['url']

                if (attachmentUrl != undefined) {

                    this.setAttachmentUrl(attachmentUrl)

                }
            }
        }

        var tags = document['tags'] || {}

        this.setTags(tags)
        this.setIdentifier(document['identifier'])
        this.setSubdocuments(subdocuments)
        this.setHasSubdocuments(document['has_subdocuments'])
        return document['rendered_text']
        
    }

    /// END MAIN STRUCTURE ///
    
    this.params = function(scope) {


        console.log('*** DS, params')
        console.log('*** DS, params, id = ' + this.document().id)
        console.log('*** DS, params, title = ' + this.document().title)
        console.log('*** DS, params, author = ' + this.document().author)

        var _params = { 
                    id: scope.id,
                    title: scope.editableTitle, 
                    public: scope.statusPublic,
                    text: scope.editText,
                    author_name: this.author()
                 }
        
        return _params
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

    this.showThatItHasSubdocuments = function(doc) {

        return doc['has_subdocuments']
    }

    

}