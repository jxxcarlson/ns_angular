module.exports = function (DocumentService, DocumentApiService, UserService, $state ) {


    this.canEdit = function () {


        value = (DocumentService.permissions().indexOf('edit') > -1)

        console.log('&&& CAN EDIT, value = ' + value)

        return value

    }

    this.canRead = function () {

        (DocumentService.permissions().indexOf('read') > -1)

    }
}
