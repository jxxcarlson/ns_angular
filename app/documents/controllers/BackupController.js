module.exports = function (DocumentService) {

    var self = this

    self.documentTitle = DocumentService.currentDocumentItem().title
    //self.backupNumber = DocumentService.getBackupNumber()
    //self.backupDate = DocumentService.getBackupDate().replace('T', ' at ').replace('+00:00', '')
    //self.backupText = DocumentService.getBackupText()

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