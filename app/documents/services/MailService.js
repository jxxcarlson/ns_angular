
module.exports = function ($window, DocumentService) {

    this.send = function(emailId,subject,message){
        $window.open("mailto:"+ emailId + "?subject=" + subject+"&body="+message,"_self");
    };

    this.shareCurrentDocument = function(){
        var doc = DocumentService.document()
        var subject = doc.title // 'Manuscripta.io document'
        var message = 'You might be interested in%0D%0A%0D%0A        ' + doc.title + '%0D%0A%0D%0Aat http://www.manuscripta.io/documents/' + doc.id
        message += "0D%0A%0D%0Ahttp://www.manuscripta.io is a site for creating and sharing documents online."
        message += "%0D%0AMathematics, Physics, Poetry, you name it."
        // this.send(recipient, subject, message)
        $window.open("mailto:" + "?subject=" + subject+"&body="+message,"_self");
    };

}


