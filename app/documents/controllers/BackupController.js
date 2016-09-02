module.exports = function(DocumentService) {

  var self = this

    self.documentTitle = DocumentService.currentDocumentItem().title
    self.backupNumber = DocumentService.getBackupNumber()
    self.backupDate = DocumentService.getBackupDate()
    self.backupText = DocumentService.getBackupText()

}