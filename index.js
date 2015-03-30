var express = require('express'),
	cep = require('cep-scraper');

var app = express();

app.use('/', express.static(__dirname + '/dist'));

app.all('/api', function(req, res) {
	if(req.query.search) {
		cep.scrape(req.query.search, function(response) {
			if(response.error) {
				res.status(404);
			}
			res.send(response);
		});
	} else {
		res.status(400).send({'error': 'Missing search query.'});
	}
});

app.get('/*', function(req, res) {
	res.sendfile('dist/views/index.html');
});

var port = process.env.PORT || 8000;

app.listen(port, function() {
	console.log('Listening on port ' + port);
});