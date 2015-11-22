/**
 * Created by Bora on 22-Nov-15.
 */

var dbConnection = require('../database');
var sw = require("swagger-node-express");

exports.createMessage = {
    'spec': {
        description : "Create a new message",
        path : "api/createMessage/{userId}/{text}/{lati}/{long}",
        method: "POST",
        summary : "Create a new message",
        type : "void",
        nickname : "createMessage",
        produces : ["application/json"],
        parameters : [
            sw.pathParam("userId", "User Id", "int"),
            sw.pathParam("text", "Message Text", "string"),
            sw.pathParam("lati", "Message Position : latitude", "string"),
            sw.pathParam("long", "Message Position : longitute", "string")
        ]

    },
    'action': function (req, res) {
        var values  = {user_id: req.params.userId, source: req.params.text, latitude: req.params.latitude, longitute : req.params.longitute };
        var query = dbConnection.query('insert into haydadb.messages SET ?',values, function(err, rows, fields) {
            if (!err)
                res.json(rows);
            else {
                console.log(query.sql);
                res.json('Error while performing Query.');
            }
        });
    }
};

exports.listMessageByUser = {
    'spec': {
        description : "List Messages By User ",
        path : "/api/listMessages/{username}",
        method: "POST",
        summary : "List Messages",
        type : "void",
        nickname : "listUsers",
        produces : ["application/json"],
        parameters : [
            sw.pathParam("username", "username", "string")
        ]
    },
    'action': function (req, res) {
        dbConnection.query('select * from haydadb.messages where username = ?', req.params.username, function(err, rows, fields) {
            if (!err)
                res.json(rows);
            else
                res.json('Error while performing Query.');
        });
    }
};