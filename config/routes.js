var controllers = require('../controllers');
var express = require('express');

/**
 * Expose routes
 */

module.exports = function (app) {

  // Search
  app.get('/api/v1/search', controllers.search);

  app.get('/*', function(req, res) {
  	res.sendFile(__dirname + '/../dist/views/index.html');
  });
}
