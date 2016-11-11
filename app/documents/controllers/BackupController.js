module.exports = function (DocumentApiService, DocumentService, UserService) {

    var self = this

    self.barr = function() {

        console.log('BARR')
    }

    self.documentTitle = DocumentService.document().title

    self.getBackup = function (id, backupNumber) {

        var request = 'backup?view=' + id + '&number=' + backupNumber
        DocumentApiService.postRequest(request, {})
            .then(
                function (response) {

                    self.backupText = response.data['backup_text']

                }
            )

    }







}