var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/proj-1');

var Moment = require('./moments.js');
module.exports.Moment = Moment;
