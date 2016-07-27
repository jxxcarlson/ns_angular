'use strict';

var app = require('angular').module('noteshareApp');

app.controller('ImagesController', require('./controllers/ImagesController'))
app.controller('ImageSearchController', require('./controllers/ImageSearchController'))
app.controller('ImageUploadController', require('./controllers/ImageUploadController'))

app.service('ImageApiService', require('./services/ImageApiService')); 
app.service('ImageRouteService', require('./services/ImageRouteService')); 
app.service('ImageService', require('./services/ImageService')); 

