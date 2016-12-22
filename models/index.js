var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/proj-1');

var Moment = require('./moments.js');

module.exports.Moment = Moment;
