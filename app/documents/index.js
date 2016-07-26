'use strict';

var app = require('angular').module('noteshareApp');

app.service('DocumentApiService', require('./services/DocumentApiService')); 
app.service('DocumentService', require('./services//DocumentService')); 
app.service('DocumentRouteService', require('./services//DocumentRouteService')); 

app.controller('newDocumentController', require('./controllers/NewDocumentController'))
app.controller('documentsController', require('./controllers/DocumentsController'))
app.controller('searchController', require('./controllers/SearchController'))
app.controller('editDocumentController', require('./controllers/EditController'))


 /* REFERENCE: https://github.com/gsklee/ngStorage */
