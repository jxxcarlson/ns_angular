module.exports = function(DocumentApiService) {

    var self = this

    self.getUsers = function() {

        var request = 'manage_users?list=all'
        DocumentApiService.postRequest(request, {})
            .then(
                function (response) {

                    self.userList = response.data['list']
                    self.userCount = self.userList.length
                    self.showUsers = true
                    self.showACLs = false

                }
            )

    }

    self.getACLs = function(owner_id) {

        var request = 'acl?acls_of_owner=' + self.aclOwnerId
        DocumentApiService.postRequest(request, {})
            .then(
                function (response) {

                    self.aclList = JSON.parse(response.data['acl_list'])
                    self.showACLs = true
                    self.showUsers = false
                }
            )

    }

    self.stringOfArray = function(array) {

        str = ""
        array.forEach(function(item) { str += item + ", "})
        return str
    }

    self.stringOfArray2 = function(array) {

        str = ""
        array.forEach(function(item) { str += item[1] + ", "})
        return str
    }

    self.getUsers()

    console.log('USER LIST: ' + JSON.stringify(self.userList))

}