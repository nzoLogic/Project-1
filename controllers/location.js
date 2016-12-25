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
function updateLoc(name, id){
  console.log('update loc online');
  db.Locations.findOne({name: name}, function(err, updatedLoc){
    if(err){
      console.log('error updating location', err);
      res.status(500).send();
    }
    else {
      updatedLoc.moments.push(id);
      updatedLoc.save();
      console.log('updated location is ', updatedLoc)
      ///may need to res.json.populate this back
    }
  })
}

module.exports = {
  allLocations : allLocations,
  update: updateLoc
}
