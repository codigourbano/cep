var express = require('express'),
	cep = require('cep-scraper');

var app = express();

app.all('/', function(req, res) {
	if(req.query.search) {
		cep.scrape(req.query.search, function(response) {
			if(response.error) {
				res.status(404);
			}
			res.send(response);
		});
	} else if(req.query.uf) {
		cep.scrape({
			uf: req.query.uf,
			localidade: req.query.localidade,
			tipo: req.query.tipo,
			logradouro: req.query.logradouro,
			numero: req.query.numero
		}, function(response) {
			if(response.error) {
				res.status(404);
			}
			res.send(response);
		});
	} else {
		res.status(400).send({'error': 'Missing search query.'});
	}

});

var port = process.env.PORT || 8000;

app.listen(port, function() {
	console.log('Listening on port ' + port);
});