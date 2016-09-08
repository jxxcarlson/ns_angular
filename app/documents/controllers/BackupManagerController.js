module.exports = function(DocumentApiService, UserService) {


    var self = this

    self.username = UserService.username()

    self.getBackup = function(id, backupNumber) {

        console.log('id: ' + id + ', backup number ' + backupNumber)
    }

    self.getLog = function() {

        var request = 'backup?log_as_json=' + self.username + '&title=' + self.backupTitle
        DocumentApiService.postRequest(request, {})
            .then(
                function(response) {

                    self.backupLog = response.data['log_as_json']

                    console.log(this.backupLog)


                }
            )

    }

    self.getBackup = function(id, backupNumber) {

        var request = 'backup?view=' + id + '&number=' + backupNumber
        DocumentApiService.postRequest(request, {})
            .then(
                function(response) {

                    self.backupText = response.data['backup_text']

                }
            )

    }

    // backup?view=151&number=1

    self.fixDate = function(date) {

        // var parts = date.split(':')
        //return (parts[0] + parts[1]).replace('T', ' ') + ' GMT'
        return 'foo' // (parts[0] + parts[1])
    }


}