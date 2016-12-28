var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    //include locations schema file
    Locations = require('./location');

  var MomentSchema = new Schema({
    message: String,
    location: {
      lat: Number,
      lng: Number
    },
    categories: [String]
  });

  var Moment = mongoose.model('Moment', MomentSchema);

  module.exports = Moment;
