'use strict';

var app = require('angular').module('noteshareApp');

app.service('UserApiService', require('./UserApiService')); 
app.service('UserService', require('./UserService'))

app.controller('SignupController', require('./SignUpController'))
app.controller('SigninController', require('./SignInController'))
app.controller('SignOutController', require('./SignOutController'))
app.controller('UserController', require('./UserController'))
app.controller('SiteController', require('./SiteController'))
app.controller('SiteDocumentController', require('./SiteDocumentController'))




