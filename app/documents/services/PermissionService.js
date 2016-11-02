module.exports = function (DocumentService, DocumentApiService, UserService, $state ) {


    this.canEdit = function () {


        if (DocumentService.permissions() == undefined) {

            console.log('DEBUG permissionService: DocumentService.permissions() gives undefined result')

            value = false

        } else {


            if (DocumentService.author() == UserService.username()) {

                console.log('DEBUG permissionService: user == author')

                value = true

            } else {

                var value = (DocumentService.permissions().indexOf('edit') > -1)

                console.log('DEBUG permissionService: edit flag = ' + value)

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
