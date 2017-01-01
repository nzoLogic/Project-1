/****************
functions for accessing moments
***************/

var db = require('../models'),
    Locations = require('./location.js');

// GET /api/moments
function allMoments(req, res){
  db.Moment.find({}, function(err, moments){
    res.json(moments);
  });
}
//POST /api/moments
function post(req, res){
  //saves req body into variable
<<<<<<< HEAD
  var location = getLatLng(req.body.location);
  req.body.location = location;
=======
  console.log(req.body)
  var location = req.body.location;
  if(location){
    req.body.location = getLatLng(location);
  }
>>>>>>> 327e8c2f0b2e40ab2aef97cb431c8a8a1a22010f
  var newMoment = new db.Moment(req.body);
    // find moments location to update embedded moments
  newMoment.save(function(err, saveMoment){
      if(err){
        console.log('error on moment save', err);
      }
      else{
        console.log(saveMoment);
        res.json(saveMoment);
      }
  })
}
//returns an object with key value pairs of lat lng
function getLatLng(strings){
<<<<<<< HEAD
  if(strings === 'unknown'){
    return strings;
  }
=======
>>>>>>> 327e8c2f0b2e40ab2aef97cb431c8a8a1a22010f
  var arr = strings.split('l');
  return {
    lat : parseFloat(arr[1]),
    lng: parseFloat(arr[2])
  }
}

module.exports = {
  allMoments: allMoments,
  post: post,
};
