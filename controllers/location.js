var db = require('../models');

//returns JSON of all locations
function allLocations(req, res){
  db.Locations.find({}, function(err, locations){
    if(err){
      console.log('error getting all locations', err);
    }
    else {
      console.log(locations);
      res.json(locations);
    }
  })
}
//updates a locations moments called on the POST route for /api/moments
function updateLoc(name, id){
  db.Locations.findOne({name: name}, function(err, updatedLoc){
    if(err){
      console.log('error updating location', err);
      res.status(500).send();
    }
    else {
      updatedLoc.moments.push(id);
      updatedLoc.save();
      ///may need to res.json.populate this back
    }
  })
}
//fetches all moments of a specific location
function getLocMoments(req, res){
  db.Locations.findOne({name: req.params.name})
      .populate('moments').exec(function(err, location){
        console.log(location);
      });
}

module.exports = {
  allLocations : allLocations,
  update: updateLoc,
  getLocMoments: getLocMoments
}
