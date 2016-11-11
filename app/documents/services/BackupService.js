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




}