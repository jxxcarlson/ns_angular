module.exports = function (DocumentApiService, DocumentService, HttpService) {

    var self = this

    self.barr = function() {

        console.log('BARR')
    }

    self.documentTitle = DocumentService.document().title

    self.getBackup = function (id, backupNumber) {

        var request = 'backup?view=' + id + '&number=' + backupNumber
        HttpService.postRequest(request, {})
            .then(
                function (response) {

                    self.backupText = response.data['backup_text']

                }
            )

    }







}