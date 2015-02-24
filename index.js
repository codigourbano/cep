var express = require('express'),
	cep = require('cep-scraper');

var app = express();

app.all('/', function(req, res) {
	if(req.query.search) {
		cep.scrape(req.query.search, function(data) {
			res.send(data);
		});
	} else {
		res.send({'error': 'Missing search query.'});
	}

});

var port = process.env.PORT || 8000;

app.listen(port, function() {
	console.log('Listening on port ' + port);
});