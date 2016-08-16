/**********

http://expressjs.com/en/api.html
http://shamadeh.com/blog/web/nodejs/express/2014/07/20/ExpressMultipleSites.html

************/

var express = require('express')
var app = express()
var PORT = 3000
var requestCount = 0

app.use(
    "/", //the URL throught which you want to access to you static content
    express.static(__dirname + '/public') //where your static content is located in your filesystem
);

app.all('*', function (req, res, next) {
  console.log('*** HOST: ' + req.hostname) 
  
  switch(req.hostname) {
        case 'www.manuscripta.io': res.sendFile('public/index.html', { root: __dirname }); 
              console.log('*** HANDLE MANUSCRIPTA'); break;
        case 'www.concertonovo.io': res.write('<h1>This is concertonovo.io</h1>'); 
              console.log('*** HANLDE CONCERTONOVO'); res.end(); break;
        default: 
            res.statusCode = 404;
            res.write('<p>We do not serve the host: <b>' + req.hostname + '</b>.</p>'); res.end();
    }   
    
  requestCount += 1
  console.log(requestCount + ' request: ' + req.params[0])
});

app.listen(process.env.PORT || PORT) //the port you want to use
console.log('\nServer listening at http://localhost:' + PORT + '\n');
