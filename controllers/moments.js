/****************
functions for accessing moments
***************/

var db = require('../models');

// GET /api/moments
function allMoments(req, res){
  db.Moment.find({}, function(err, moments){
    console.log('currently in controllers/moments.js');
    res.json(moments);
  });
}
//POST /api/moments
function post(req, res){
  console.log('posst');
}
module.exports = {
  allMoments: allMoments,
  post: post
};
