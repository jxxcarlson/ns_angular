module.exports = function(DocumentApiService, UserService, $location, $confirm, HttpService) {


    var self = this

    console.log('*** BackupManager, query = ' + JSON.stringify($location.search()))

    self.username = UserService.username()

    self.getLogForId = function(id) {

        var request = 'backup?log_as_json=' + self.username + '&title=' + id
        HttpService.postRequest(request, {})
            .then(
                function(response) {

                    self.backupLog = response.data['log_as_json']

                    console.log(this.backupLog)

                }
            )

    }

        var queryObject = $location.search()
    if (queryObject['id'] == undefined) {

        console.log('*** ID not defined')

    } else {

        console.log('*** ID = ' + queryObject['id'])
        self.getLogForId(queryObject['id'])
    }






    self.getBackup = function(id, backupNumber) {

        console.log('id: ' + id + ', backup number ' + backupNumber)
    }



    self.getLog = function() {

        var request = 'backup?log_as_json=' + self.username + '&title=' + self.backupTitle
        HttpService.postRequest(request, {})
            .then(
                function(response) {

                    self.backupLog = response.data['log_as_json']

                    console.log(this.backupLog)


                }
            )

    }

    self.getBackup = function(id, backupNumber) {

        var request = 'backup?view=' + id + '&number=' + backupNumber
        HttpService.postRequest(request, {})
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



    self.getDeletedDocuments = function () {

        console.log('getDeletedDocuments !!')


        var request = 'documents?deleted=' + UserService.username()
        HttpService.getRequest(request, {})
            .then(
                function (response) {

                    self.deletedDocuments = response.data['documents']
                    self.numberOfDeletedDocuments = ': ' + self.deletedDocuments.length

                }
            )


    }


    self.trashDoc = function(id) {

        $confirm({text: 'Are you sure you want to trash this document?  THIS ACTION CANNOT BE UNDONE '})
            .then(function() {
                self.doTrashDoc(id)
            });
    }



    self.doTrashDoc  = function(id) {

        console.log('Trash document ' + id)
        var url = 'documents/' + id + '?mode=hard'
        HttpService.deleteRequest(url, {})
            .then(
                function(response) {

                    console.log(JSON.stringify(response.data))
                    self.getDeletedDocuments()

                }
            )

    }


    self.undeleteDoc = function(id) {

        console.log('Undelete document ' + id)
        var url = 'documents/' + id + '?mode=undelete'
        HttpService.deleteRequest(url, {})
            .then(
                function(response) {

                    console.log(JSON.stringify(response.data))
                    self.getDeletedDocuments()

                }
            )
    }

}