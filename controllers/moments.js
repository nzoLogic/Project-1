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
  var location = getLatLng(req.body.location);
  req.body.location = location;
  console.log(location)
  var newMoment = new db.Moment(req.body);
    // find moments location to update embedded moments
  newMoment.save(function(err, saveMoment){
      if(err){
        console.log('error on moment save', err);
      }
      else{
        console.log(saveMoment)
        res.json(saveMoment);
      }
  })
}
function getLatLng(strings){
  var arr = strings.split('l');
  return {
    lat : parseFloat(arr[1]),
    lng: parseFloat(arr[2])
  }
}
//DELETE last moment
// function remove(req, res){
//   db.Moment.find
// }
module.exports = {
  allMoments: allMoments,
  post: post,
};
