module.exports = function ($scope, UserService, UserApiService, DocumentApiService) {

    var self = this

    self.username = UserService.username()


    UserApiService.getPreferences(self.username, self)

    self.updateAclDisplay = function() {

        var request = 'acl?acls_of_owner=' + UserService.username()
        DocumentApiService.postRequest(request, $scope)
            .then(function (response) {

                var data = JSON.parse(response.data['acl_list'])
                console.log('ACL DATA: ' + data)
                console.log('ACL DATA LENGTH: ' + data.length)
                console.log('ACL DATA first item: ' + data[0])

                var stringify_list = function(array) {

                    var str = ""
                    array.forEach(function(element) { str += element + ', '})
                    return str.slice(0, str.length - 2)
                }

                var stringify_pair_list = function(array) {

                    var str = ""
                    array.forEach(function(element) { str += element[1] + ', '})
                    return str.slice(0, str.length - 2)
                }

                var prettify = function(item) {

                    var obj = {}
                    obj.name = item.name
                    obj.permission = item.permission
                    obj.members  = stringify_list(item.members)
                    obj.documents =  stringify_pair_list(item.documents)
                    return obj
                }

                var list = []
                var counter = 0

                data.forEach( function(item) {

                    list.push({
                        "id": counter,
                        "acl": prettify(item)
                    })
                })

                console.log('*** acl list: ' + JSON.stringify(list))

                self.aclList = list

            })
    }

    self.updateAclDisplay()

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
        UserApiService.updatePreferences('doc_format', kk)
    }

    self.setPreferences = function (kk) {
        var params = {doc_format: kk}
        //  UserApiService.updatePreferences(params, $scope)
    }

    self.addUserToAcl = function() {

        console.log('add user ' + self.usernameForAcl + ' to acl ' + self.aclNameForUser)

        var request = 'acl?add_user=' + self.usernameForAcl +'&acl=' + self.aclNameForUser
        DocumentApiService.postRequest(request, $scope)
            .then( function() {self.updateAclDisplay()} )


    }
    self.removeUserFromAcl = function() {

        console.log('remove user ' + self.usernameForAcl + ' from acl ' + self.aclNameForUser)

        var request = 'acl?remove_user=' + self.usernameForAcl +'&acl=' + self.aclNameForUser
        DocumentApiService.postRequest(request, $scope)
            .then( function() {self.updateAclDisplay()} )
    }

    self.addDocumentToAcl = function() {

        console.log('add document ' + self.documentIdForAcl + ' to acl ' + self.aclNameForDocument)

        var request = 'acl?add_document=' + self.documentIdForAcl +'&acl=' + self.aclNameForDocument
        console.log("*** request = " + request)
        DocumentApiService.postRequest(request, $scope)
            .then( function() {self.updateAclDisplay()} )

    }
    self.removeDocumentFromAcl = function() {

        console.log('remove document ' + self.documentIdForAcl + ' from acl ' + self.aclNameForDocument)

        var request = 'acl?remove_document=' + self.documentIdForAcl +'&acl=' + self.aclNameForDocument
        DocumentApiService.postRequest(request, $scope)
            .then( function() {self.updateAclDisplay()} )
    }

    self.createAcl = function() {

        console.log('create ACL ' + self.aclNameCD + ' with permission ' + self.permissionForAcl)

        var request = 'acl?create_acl=' + self.aclNameCD + '&permission=' + self.permissionForAcl
        DocumentApiService.postRequest(request, $scope)
            .then( function() {self.updateAclDisplay()} )

}
    self.destroyAcl = function() {

        console.log('destroy ACL ' + self.aclNameCD)

        var request = 'acl?remove_acl=' + self.aclNameCD
        DocumentApiService.postRequest(request, $scope)
            .then( function() {self.updateAclDisplay()} )
    }

}