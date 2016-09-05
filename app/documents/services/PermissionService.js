module.exports = function (DocumentService, DocumentApiService, UserService, $state ) {


    this.canEdit = function () {


        console.log('&&& CAN EDIT, entry')

        if (DocumentService.document().owner_id == UserService.user_id()) {


            console.log('&&& CAN EDIT, permission granted (1)')
            return true

        } else {

            console.log('&&& CAN EDIT, interrogating ACLS (2)')
            var request = 'acl?grant_permission=' + DocumentService.currentDocumentItem().id + '&user=' + UserService.username() + '&permission=edit'
            DocumentApiService.postRequest(request, {})
                .then(function (response) {


                    console.log('*** PERMISSSION GRANTED: ' + response.data['permission_granted'])

                    if (response.data['permission_granted'] == true) {

                        $state.go('editdocument')
                    }


                })


        }

    }

    this.canRead = function () {

        if (DocumentService.getPublic == true || DocumentService.document().owner_id == UserService.user_id()) {

            return true

        } else {

            return false

        }

    }
}
