module.exports = function ($scope, UserService, UserApiService, DocumentApiService) {

    var self = this

    self.username = UserService.username()


    UserApiService.getPreferences(self.username, self)


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


}