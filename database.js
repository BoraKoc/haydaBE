/**
 * Created by bora on 8.11.2015.
 */

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : "eu-cdbr-azure-west-c.cloudapp.net",
    user     : "b95d9857c908ae",
    password : "551917e7",
    database : 'haydadb'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }});

module.exports = connection;