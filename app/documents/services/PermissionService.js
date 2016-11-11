module.exports = function (DocumentService, UserService, $localStorage ) {


    this.canEdit = function () {


        if (this.permissions() == undefined) {

            value = false

        } else {


            if (DocumentService.document().author == UserService.username()) {

                value = true

            } else {

                var value = (this.permissions().indexOf('edit') > -1)

                var checkedOutToVar = this.checkedOutTo()

                if ( checkedOutToVar != undefined && checkedOutToVar != '' && checkedOutToVar != UserService.username()) {

                    console.log('Access denied because document is checked out to ' + checkedOutToVar)

                    value = false
                }

            }

        }

        return value
    }

    this.canRead = function () {

        (this.permissions().indexOf('read') > -1)

    }

    // PERMISSIONS

    this.setPermissions = function(permissions) {

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
}
