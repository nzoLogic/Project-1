/****************
functions for accessing moments
***************/

var db = require('../models'),
    Locations = require('./location.js');

// GET /api/moments
function allMoments(req, res){
  db.Moment.find({}, function(err, moments){
    console.log('currently in controllers/moments.js');
    res.json(moments);
  });
}
//POST /api/moments
function post(req, res){
  //saves req body into variable
  var newMoment = new db.Moment(req.body),
      locationName = req.body.location;
  // find moments location to update embedded moments
  newMoment.save(function(err, saveMoment){
      if(err){
        console.log('error on moment save', err);
      }
      else{
        Locations.update(locationName, saveMoment._id)
        res.json(saveMoment);
      }
  })
}
module.exports = {
  allMoments: allMoments,
  post: post
};
