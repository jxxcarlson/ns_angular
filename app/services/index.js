'use strict';

var app = require('angular').module('noteshareApp');


app.service('foo', require('./foo'))
app.service('FileUpload', require('./FileUpload'))



