var express = require("express")
    , swagger = require("swagger-node-express")
    , path = require('path')
    , argv = require('minimist')(process.argv.slice(2))
    , version = require("./models/version")
    , models = require("./models/models")
    , users = require("./models/users")
    , app = express();

app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/lib', express.static(path.join(__dirname, 'lib')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Set the main handler in swagger to the express app
swagger.setAppHandler(app);

// Adding models and methods to our RESTFul service
swagger.addModels(models)
    .addGet(version.getVersionInfo);

swagger.addModels(models)
    .addGet(users.listUsers);
swagger.addModels(models)
    .addPOST(users.createUser);

// set api info
swagger.setApiInfo({
    title: "Hayda API",
    description: "API to Hayda",
    termsOfServiceUrl: "",
    contact: "borakoc32@gmail.com",
    license: "",
    licenseUrl: ""
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

// Set api-doc path
swagger.configureSwaggerPaths('', 'api-docs', '');

// Configure the API domain
var domain = '104.155.7.174';

// Configure the API port
var port = process.env.PORT || 8080;

// Set and display the application URL
var applicationUrl = domain +':'+ port;
console.log(applicationUrl);
console.log('Hayda API running on ' + applicationUrl);

swagger.configure(applicationUrl, '1.0.0');

// Start the web server
app.listen(port);