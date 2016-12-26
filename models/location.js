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
    moments: [{
      type: Schema.Types.ObjectId,
      ref: 'Moment'
    }]
  });

var Locations = mongoose.model('Locations', LocationSchema);
module.exports = Locations;
