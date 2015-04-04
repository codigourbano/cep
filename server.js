
var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');

var app = express();
var port = process.env.PORT || 3000;

// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect('mongodb://localhost/cep', options);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models
fs.readdirSync(__dirname + '/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

app.use('/', express.static(__dirname + '/dist'));

// Bootstrap application settings
require('./config/express')(app);

// Bootstrap routes
require('./config/routes')(app);

app.listen(port);
console.log('Express app started on port ' + port);

/**
 * Expose
 */

module.exports = app;
