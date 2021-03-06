module.exports = function($localStorage, UserService) {

    var self = this

    /** State:
       document
       ---


    
    **/

    this.setScrollTop = function(position) {

        console.log('I set the scroll top to: ' + position)
        $localStorage.scrollTop = position
    }

    this.getScrollTop = function() {

        return $localStorage.scrollTop
    }

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