/**
 * Module dependencies.
 */

var compression = require('compression');
var bodyParser = require('body-parser');

/**
 * Expose
 */

module.exports = function (app) {

  // Compression middleware (should be placed before express.static)
  app.use(compression({
    threshold: 512
  }));

  // bodyParser should be above methodOverride
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


};
