var jwt = require('jwt-simple');
var sw = require("swagger-node-express");
var dbConnection = require('../database');

exports.login = {
    'spec': {
        description : "Create a new user",
        path : "/login/{email}/{password}",
        method: "POST",
        summary : "Create a new user",
        type : "void",
        nickname : "createUser",
        produces : ["application/json"],
        parameters : [
            sw.pathParam("email", "Email", "string"),
            sw.pathParam("password", "Password", "string")
        ]
    },
    'action': function (req, res) {
        var values  = {name: req.params.email, password: req.params.password};
        dbConnection.query('select * from haydadb.users where email = ? and password = ?',[req.params.email, req.params.password ], function(err, rows, fields) {
            if (!err && rows.length > 0)
                res.json(genToken(rows[0].name));
            else {
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Invalid credentials"
                });
            }
        });

        // private method
        function genToken(user) {
            var expires = expiresIn(7); // 7 days
            var token = jwt.encode({
                exp: expires
            }, require('../config/secret')());

            return {
                token: token,
                expires: expires,
                user: user
            };
        }

        function expiresIn(numDays) {
            var dateObj = new Date();
            return dateObj.setDate(dateObj.getDate() + numDays);
        }
    }
};
