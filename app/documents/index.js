'use strict';

var app = require('angular').module('noteshareApp');

app.service('DocumentApiService', require('./services/DocumentApiService')); 
app.service('DocumentService', require('./services//DocumentService')); 
app.service('DocumentRouteService', require('./services//DocumentRouteService')); 
app.service('MathJaxService', require('./services/MathJaxService')); 
app.service('SearchService', require('./services/SearchService'));  
app.service('CollectionService', require('./services/CollectionService'));

app.controller('newDocumentController', require('./controllers/NewDocumentController'))
app.controller('documentsController', require('./controllers/DocumentsController'))
app.controller('searchController', require('./controllers/SearchController'))
app.controller('editDocumentController', require('./controllers/EditController'))
app.controller('DeleteDocumentController', require('./controllers/DeleteDocumentController'))
app.controller('PrintDocumentController', require('./controllers/PrintDocumentController'))


 /* REFERENCE: https://github.com/gsklee/ngStorage */
