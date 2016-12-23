var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    //include moment Schema
    Moments = require('./moments.js');

  var LocationSchema = new Schema({
    name: String,
    coordinates: {
      lat: Number,
      lng: Number
    },
    moments: [String]
  });

var Locations = mongoose.model('Locations', LocationSchema);
module.exports = Locations;
