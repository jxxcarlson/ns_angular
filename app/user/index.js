'use strict';

var app = require('angular').module('noteshareApp');

app.service('UserApiService', require('./UserApiService'));

app.service('UserService', require('./UserService'))
app.controller('signupController', require('./SignUpController'))
app.controller('SigninController', require('./SignInController'))




