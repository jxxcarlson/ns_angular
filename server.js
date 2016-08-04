/**********

http://expressjs.com/en/api.html

************/

var express = require('express')
var app = express()
var PORT = 3000
var requestCount = 0

app.use(
    "/", //the URL throught which you want to access to you static content
    express.static(__dirname + '/public') //where your static content is located in your filesystem
);

// app.all('(?=^((?!style).)*$)(?=^((?!js).)*$)', function (req, res, next) {
app.all('*', function (req, res, next) {
  res.sendFile('public/index.html', { root: __dirname });
  requestCount += 1
  console.log(requestCount + ' request: ' + req.params[0])
});

app.listen(PORT) //the port you want to use
console.log('\nServer listening at http://localhost:' + PORT + '\n');
