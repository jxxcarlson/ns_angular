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

    // ID:

    this.parentId = function() {


        var links = this.document().links
        var parent = links.parent || {}
        if (parent == {}) {

            return 0

        } else {

            return parent.id

        }

    }


    // SUBDOCUMENTS:

    // Subdocuments of current document
    this.setSubdocuments = function(subdocumentArray) { 
        $localStorage.subdocuments = subdocumentArray
    }
    this.subdocuments = function() { return $localStorage.subdocuments || []}
    this.subdocumentCount = function() { return this.subdocuments().length }

    this.setHasSubdocuments = function(value) { $localStorage.hasSubdocuments = value }
    this.hasSubdocuments = function() { return ($localStorage.hasSubdocuments || false)  }

    this.showThatItHasSubdocuments = function(doc) {

        return doc['has_subdocuments']
    }


    //  ATTACHMENTS

    this.setAttachmentUrl = function(url) {

        $localStorage.attachmentUrl = url
    }

    this.attachmentUrl = function() {

        return $localStorage.attachmentUrl
    }


    
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







    // DOCUMENT


    this.document = function() {

        // Fallback  if page is reloaded:
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

        // GUARD:
        if (document == undefined) {

            console.log('WARNING: document is undefined')

            return
        }

        // Set document in memory
        this.currentDocument = document
        // .. and mirror it "on disk"
        $localStorage.currentDocument = document
        
        var links = document['links'] || {}
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

        var subdocuments = links['documents'] || []
        this.setSubdocuments(subdocuments)
        this.setHasSubdocuments(document['has_subdocuments'])


        return document['rendered_text']
        
    }

    // DOCUMENT PROPERTIES


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

    this.params = function(scope) {

        var _params = { 
                    id: scope.id,
                    title: scope.editableTitle, 
                    public: scope.statusPublic,
                    text: scope.editText,
                    author_name: this.document().author
                 }
        
        return _params
    }

}