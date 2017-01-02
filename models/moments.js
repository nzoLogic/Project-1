var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    //include locations schema file
  var MomentSchema = new Schema({
    message: String,
    unknown: Boolean,
    location: {
      lat: {
        type: Number,
        default: -79.120939
      },
      lng: {
        type: Number,
        default: -47.191586
      }
    },
    categories: [String]
  });

  var Moment = mongoose.model('Moment', MomentSchema);

  module.exports = Moment;
