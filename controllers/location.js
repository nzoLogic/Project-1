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

module.export = {
  allLocations : allLocations
}
