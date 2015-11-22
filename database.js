/**
 * Created by bora on 8.11.2015.
 */

var mysql      = require('mysql');
var connection = mysql.createConnection({
 //   host     : "10.240.0.2",
    host : "104.155.69.200",
    user     : "root",
    password : "QU6vfNpx",
    database : 'mysql'
});

connection.prototype = Object.prototype;
connection.prototype.q = function(sql, callback){
    this.query(sql,function(err, rows, fields){
        var data = {rows:rows, fields:fields};
        callback( err, data);
    });
};

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }});

module.exports = connection;