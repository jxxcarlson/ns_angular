module.exports = function(DocumentService) {


    this.getCollectionItem = function(scope) {

        var stackTop = DocumentService.collectionStackTop()

        console.log('*** DRS, stackTop: ' + JSON.stringify(stackTop))

        if (stackTop == undefined) {

            console.log('QQ:0')
            scope.collectionTitle = undefined
            scope.tableOfContentsTitle = 'Search results (' + DocumentService.documentCount() + ')'

        }
        else
        {
            console.log('QQ:1 ')
            var currentItem = DocumentService.currentDocumentItem()
                // var collectionItem = {}
            if (DocumentService.itemsAreEqual(stackTop, currentItem)) {

                scope.collectionItem = DocumentService.collectionStackPeek(1)
                console.log('QQ:2 ' + JSON.stringify(scope.collectionItem))
            }
            else
            {
                scope.collectionItem = stackTop
                console.log('QQ:3 ' + JSON.stringify(scope.collectionItem))
            }
            scope.collectionTitle = scope.collectionItem.title
            scope.collectionId = scope.collectionItem.id
            console.log('QQ:4 id = ' + scope.collectionId)
            console.log('QQ:4 title = ' + scope.collectionTitle)
            scope.tableOfContentsTitle = 'Contents'

        }

    }



}