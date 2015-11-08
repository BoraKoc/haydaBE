/**
 * Created by bora on 8.11.2015.
 */

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : "10.240.0.2",
    user     : "root",
    password : "QU6vfNpx",
    database : 'mysql'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }});

module.exports = connection;