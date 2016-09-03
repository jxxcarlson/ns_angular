module.exports = function(DocumentService, UserService) {


    this.canEdit = function() {

       if  (DocumentService.document().owner_id == UserService.user_id()) { return true }
       return false
    }
}
