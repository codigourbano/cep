
var mongoose = require('mongoose');
var cep = mongoose.model('Cep');
var cepScraper = require('cep-scraper');


exports.search = function(req,res){
  if(req.query.term) {
    cep.search(req.query.term, function(err, cep) {
      if (err) return res.status(404);
      res.json(cep);
    });
  } else if(req.query.uf) {
    cepScraper.scrape({
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
}
