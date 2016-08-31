module.exports = function ($scope, UserService, UserApiService) {

    var self = this

    self.username = UserService.username()


    UserApiService.getPreferences(self.username, self)

    console.log('foo = ' + self.foo)
    console.log('default doc type = ' + UserService.getPreferences().default_document_type)

    self.getDocKindClass = function (kk) {

        if (kk == UserService.getPreferences().default_document_type) {
            return {"background-color": "#efe"}
        } else {
            return {}
        }
        
    }

    self.setPreferences = function (kk) {
        var params = {set_default_document_type: kk, author_name: UserService.username()}
        //  UserApiService.updatePreferences(params, $scope)
    }


}