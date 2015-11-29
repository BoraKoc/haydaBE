/**
 * Created by bora on 8.11.2015.
 */

var dbConnection = require('../database');
var sw = require("swagger-node-express");

exports.createUser = {
  'spec': {
    description : "Create a new user",
    path : "/createUser/{nickname}/{password}/{email}",
    method: "POST",
    summary : "Create a new user",
    type : "void",
    nickname : "createUser",
    produces : ["application/json"],
    parameters : [
      sw.pathParam("nickname", "User nickname", "string"),
      sw.pathParam("password", "User password", "string"),
      sw.pathParam("email", "User email", "string")
    ]

  },
  'action': function (req, res) {
    var values  = {nickname: req.params.nickname, source: "application", password: req.params.password, email: req.params.email};
    var query = dbConnection.query('insert into haydadb.users SET ?',values, function(err, rows, fields) {
      if (!err)
        res.json(rows);
      else {
        console.log(query.sql);
        res.json('Error while performing Query.');
      }
    });
  }
};

exports.listUsers = {
  'spec': {
    description : "List Users ",
    path : "/api/listUsers/",
    method: "GET",
    summary : "List Users",
    type : "void",
    nickname : "listUsers",
    produces : ["application/json"]
  },
  'action': function (req, res) {
    dbConnection.query('select * from haydadb.users', function(err, rows, fields) {
      if (!err)
        res.json(rows);
      else
        res.json('Error while performing Query.');
    });
  }
};