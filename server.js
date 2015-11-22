var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var swagger = require("swagger-node-express");

var models = require("./routes/modelTemplate");
var users = require("./routes/users");
var auth = require("./routes/auth");
var version = require("./routes/version");
var messages = require("./routes/messages");

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/lib', express.static(path.join(__dirname, 'lib')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you 
// are sure that authentication is not needed
app.all('/api/*', [require('./middlewares/validateRequest')]);

// If no route is matched by now, it must be a 404
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

// Start the server
app.set('port', process.env.PORT || 8080);

// Set the main handler in swagger to the express app
swagger.setAppHandler(app);

// Adding models and methods to our RESTFul service
swagger.addModels(models).addPOST(auth.login);
swagger.addModels(models).addGET(users.listUsers);
swagger.addModels(models).addPOST(users.createUser);
swagger.addModels(models).addGET(version.getVersionInfo);
swagger.addModels(models).addPOST(messages.createMessage);
swagger.addModels(models).addPOST(messages.listMessageByUser);

// set api info
swagger.setApiInfo({
    title: "Hayda API",
    description: "API to Hayda",
    termsOfServiceUrl: "",
    contact: "borakoc32@gmail.com",
    license: "",
    licenseUrl: ""
});

// Set api-doc path
swagger.configureSwaggerPaths('', 'api-docs', '');

// Configure the API domain
//var domain = '146.148.112.61';
var domain = 'localhost';
var port = process.env.PORT || 8080;
var applicationUrl = domain +':'+ port;

swagger.configure(applicationUrl, '1.0.0');

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
var server = app.listen(app.get('port'), function() {
    console.log('Hayda API running on ' + applicationUrl);
});
