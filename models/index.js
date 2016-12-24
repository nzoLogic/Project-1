var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/proj-1');

var Moment = require('./moments.js');
var Locations = require('./location.js');
module.exports.Moment = Moment;
module.exports.Locations = Locations;
