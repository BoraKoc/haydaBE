var jwt = require('jwt-simple');
var dbConnection = require('../database');

module.exports = function(req, res, next) {

  // When performing a cross domain request, you will recieve
  // a preflighted request first. This is to check if our the app
  // is safe.

  // We skip the token outh for [OPTIONS] requests.
  if(req.method == 'OPTIONS') next();

  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

  var dbUser = dbConnection.query('select * from haydadb.users where email = ?',key, function(err, rows, fields) {
      if (!err && rows.length > 0) {
          if (token || key) {
              try {
                  var decoded = jwt.decode(token, require('../config/secret.js')());

                  if (decoded.exp <= Date.now()) {
                      res.status(400);
                      res.json({
                          "status": 400,
                          "message": "Token Expired"
                      });
                      return;
                  }
              } catch (err) {
                  res.status(500);
                  res.json({
                      "status": 500,
                      // "message": "Oops something went wrong",
                      "message": err.toString(),
                      "error": err
                  });
              }
          next();
          }
          else {
              res.status(401);
              res.json({
                  "status": 401,
                  "message": "Invalid Token or Key"
              });
              return;
          }
      }
      else {
          res.status(401);
          res.json({
              "status": 401,
              "message": "Invalid credentials"
          });
      }
  });

}