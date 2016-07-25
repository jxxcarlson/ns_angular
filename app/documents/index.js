'use strict';

var app = require('angular').module('noteshareApp');

app.service('DocumentApiService', require('./DocumentApiService')); 
app.service('DocumentService', require('./DocumentService')); 


app.controller('newDocumentController', require('./NewDocumentController'))
app.controller('documentsController', require('./DocumentsController'))
app.controller('searchController', require('./SearchController'))
app.controller('editDocumentController', require('./EditController'))


 /* REFERENCE: https://github.com/gsklee/ngStorage */
