/**
 * Created by eftal on 8.11.2015.
 */

var dbConnection = require('../database');

exports.getVersionInfo = {
    'spec': {
        description : "Get Version Info ",
        path : "/version/",
        method: "GET",
        summary : "Get version info",
        type : "void",
        nickname : "getVersionInfo",
        produces : ["application/json"]
    },
    'action': function (req, res) {
        dbConnection.query('select * from haydadb.version', function(err, rows, fields) {
            if (!err)
                res.json(rows);
            else
                res.json('Error while performing Query.');
        });
    }
};