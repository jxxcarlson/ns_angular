'use strict';

var app = require('angular').module('noteshareApp');


app.service('foo', require('./foo'))
app.service('FileUpload', require('./FileUpload'))
app.service('PSFileUpload', require('./PSFileUpload'))
app.service('GlobalService', require('./GlobalService'))



