module.exports = function($http, envService, UserService) {


    this.getRequest = function (request, scope) {

        console.log('API: getRequest: ' + request)

        var url = envService.read('apiUrl') + '/' + request
        var options = {headers: {"accesstoken": UserService.accessToken()}}

        return $http.get(url, {}, options)


    }


    this.postRequest = function (request, scope) {

        console.log('API: postRequest: ' + request)

        var url = envService.read('apiUrl') + '/' + request
        var options = {headers: {"accesstoken": UserService.accessToken()}}

        return $http.post(url, {}, options)


    }


    this.deleteRequest = function (request, scope) {

        console.log('API: deleteRequest: ' + request)

        var url = envService.read('apiUrl') + '/' + request
        console.log('URL: ' + url)
        var options = { headers: { "accesstoken": UserService.accessToken() }}

        // var url = envService.read('apiUrl') + '/documents/' + DocumentService.currentDocumentItem().id + '?mode=soft'


        console.log('ACCESS TOKEN: ' + UserService.accessToken())


        return $http.delete(url, options)


    }

}