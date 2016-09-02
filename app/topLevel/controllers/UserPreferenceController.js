module.exports = function ($scope, UserService, UserApiService) {

    var self = this

    self.username = UserService.username()


    UserApiService.getPreferences(self.username, self)

    console.log('foo = ' + self.foo)
    console.log('default doc type = ' + UserService.getPreferences().doc_format)

    self.getDocKindClass = function (kk) {

        if (kk == UserService.getPreferences().doc_format) {
            return {"background-color": "#efe"}
        } else {
            return {}
        }
        
    }

    self.setKind = function(kk) {

        console.log('I set the doc_format to ' + kk)
        UserApiService.updatePreferences('doc_format=' + kk)
    }

    self.setPreferences = function (kk) {
        var params = {doc_format: kk}
        //  UserApiService.updatePreferences(params, $scope)
    }


}