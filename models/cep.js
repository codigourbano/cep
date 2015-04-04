var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cepScraper = require('cep-scraper');

/*
 * Schema
 */

var CepSchema = new Schema({
  _id: String,
  state: String,
  city: String,
  district: String,
  address: {
    name: String,
    range: [String, String],
    side: String
  },
  client: String
});

CepSchema.statics = {
  search: function(term, doneSearch){
    var self = this;

    cepScraper.scrape(term, function(response) {
      if(response.error) return doneSearch(response.error);

      if (response.data.length > 0){
        var cep = response.data[0];
        self.update({_id: cep.postcode}, cep, {upsert: true}, function(err){
          if (err) return doneSearch(err);
          doneSearch(null,cep);
        })
      } else doneSearch(null, {});
    });
  }
}


mongoose.model('Cep', CepSchema);
