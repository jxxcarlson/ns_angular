module.exports = function(DocumentApiService) {

    var self = this

    self.getUsers = function() {

        var request = 'manage_users?list=all'
        DocumentApiService.postRequest(request, {})
            .then(
                function (response) {

                    self.userList = response.data['list']
                    self.userCount = self.userList.length

                }
            )

    }

    self.getUsers()

    console.log('USER LIST: ' + JSON.stringify(self.userList))

}