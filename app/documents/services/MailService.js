
module.exports = function ($window, DocumentService) {

    this.send = function(emailId,subject,message){
        $window.open("mailto:"+ emailId + "?subject=" + subject+"&body="+message,"_self");
    };

    this.shareCurrentDocument = function(){
        var subject = '' // 'Manuscripta.io document'
        var recipient = ''
        var documentItem = DocumentService.currentDocumentItem()
        var message = 'You might be interested in%0D%0A%0D%0A        ' + documentItem.title + '%0D%0A%0D%0Aat http://www.manuscripta.io/documents/' + documentItem.id
        this.send(recipient, subject, message)
        $window.open("mailto:"+ emailId + "?subject=" + subject+"&body="+message,"_self");
    };

}

