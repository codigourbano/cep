var $ = require('cheerio'),
	_ = require('underscore'),
	request = require('request');

var url = 'http://www.buscacep.correios.com.br/servicos/dnec/consultaEnderecoAction.do';

module.exports = function(search, cb) {
	request({
		url: url,
		method: 'POST',
		form: {
			relaxation: search,
			TipoCel: 'ALL',
			semelhante: 'N',
			cfm: 1,
			Metodo: 'listaLogradouro',
			TipoConsulta: 'relaxation'
		}
	}, function(err, res, body) {

		var results = [];

		if(err)
			console.log(err);

		var html = $.load(body);
		var dataTable = html('.ctrlcontent div > table:first-child');

		dataTable.find('tr').each(function() {

			var item = $(this);

			results.push({
				'logradouro': item.find('td:nth-child(1)').text(),
				'bairro': item.find('td:nth-child(2)').text(),
				'localidade': item.find('td:nth-child(3)').text(),
				'uf': item.find('td:nth-child(4)').text(),
				'cep': item.find('td:nth-child(5)').text()
			});

		});

		if(typeof cb == 'function')
			cb(results);

	});
};