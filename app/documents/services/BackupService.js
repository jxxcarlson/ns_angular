module.exports = function($localStorage) {



    this.putBackup = function(data) {

        $localStorage.backupText = data['backup_text']
        $localStorage.backupNumber = data['backup_number']
        $localStorage.backupDate = data['backup_date']
    }

    this.getBackupText = function() {

        return $localStorage.backupText
    }

    this.getBackupNumber = function() {

        return $localStorage.backupNumber
    }

    this.getBackupDate = function() {

        return $localStorage.backupDate
    }

    //// BACKUP UTILITIES ////

    this.backupDocument = function () {

        console.log('API: backupDocument')

        var url = envService.read('apiUrl') + '/backup?put=' + DocumentService.document().id
        var options = {headers: {"accesstoken": UserService.accessToken()}}

        $http.post(url, {}, options)
            .then(function (response) {

                console.log('  -- backup, status: ' + response.data['status'])
                $state.go('editdocument', {}, {reload: true})


            })

    }



    this.getBackupText = function (backup_number) {

        console.log('API: backupDocument')

        var url = envService.read('apiUrl') + '/backup?view=' + DocumentService.document().id + '&number=' + backup_number
        var options = {headers: {"accesstoken": UserService.accessToken()}}

        $http.post(url, {}, options)
            .then(function (response) {

                console.log('backup view status: ' + response.data['status'])
                console.log('  -- backup text length ' + response.data['backup_text'].length)

                BackupService.putBackup(response.data)
                $location.path('backups/')
                $state.go('backups', {}, {reload: true})


            })

    }



}