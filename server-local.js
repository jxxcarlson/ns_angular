var express = require('express');
var vhost = require('vhost');

var concertoNovoDomain = 'localhost';
var angularAppDomain = 'jxxmbp.local'

var PORT = 3000

var app = express()
var angularApp = express()
var concertoNovoApp = express()

var PORT = 3000
var requestCount = 0
var concertoNovoRequestCount = 0

angularApp.use(
    "/", //the URL throught which you want to access to you static content
    express.static(__dirname + '/public') //where your static content is located in your filesystem
);

// app.all('(?=^((?!style).)*$)(?=^((?!js).)*$)', function (req, res, next) {
angularApp.all('*', function (req, res, next) {
  console.log('*** HOST: ' + req.hostname) 
  console.log('*** PATH: ' + req.path)
  res.sendFile('public/index.html', { root: __dirname });
  requestCount += 1
  console.log('*** ' + requestCount + ', request: ' + req.params[0])
});

concertoNovoApp.use(
    "/", //the URL throught which you want to access to you static content
    express.static(__dirname + '/novo') //where your static content is located in your filesystem
);

concertoNovoApp.all('*', function (req, res, next) {
  console.log('*** HOST: ' + req.hostname) 
  console.log('*** PATH: ' + req.path)
  concertoNovoRequestCount += 1
  console.log('*** ' + concertoNovoRequestCount + ', request: ' + req.params[0])
});

app.use(vhost(concertoNovoDomain, concertoNovoApp))
app.use(vhost(angularAppDomain, angularApp))

app.listen(3000, function() {
    console.log( 'Express server listening on port %d in %s mode', PORT, app.settings.env );
});
