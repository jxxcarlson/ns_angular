module.exports = function (DocumentService, DocumentApiService, UserService, $state ) {


    this.canEdit = function () {


        if (DocumentService.permissions() == undefined) {

            value = false

        } else {


            if (DocumentService.author() == UserService.username()) {

                value = true

            } else {

                var value = (DocumentService.permissions().indexOf('edit') > -1)

                var checkedOutTo = DocumentService.checkedOutTo()

                if ( checkedOutTo != undefined && checkedOutTo != '' && checkedOutTo != UserService.username()) {

                    console.log('Access denied because document is checked out to ' + checkedOutTo)

                    value = false
                }

            }

        }

        return value
    }

    this.canRead = function () {

        (DocumentService.permissions().indexOf('read') > -1)

    }
}
