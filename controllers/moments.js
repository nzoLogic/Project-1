/****************
functions for accessing moments
***************/

var db = require('../models');
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
//deletes moment by id
function deleteMoment(req,res){
  db.Moment.findOneAndRemove({_id: req.params.id}, function(err, delMoment){
    if(err){
      return res.status(500).send();
    }
    res.send('Moment Deleted');
  })
}
//update moment by id
function updateMoment(req, res){
  var form = req.body;
  var params = req.params.id;
  var updates = {
    'message': form.message,
    'categories': form.categories,
    'returnNewDocument': true
  };
  if(form.location){
    updates.location = form.location;
  }
  db.Moment.findOneAndUpdate({_id: req.params.id},updates, function(err, updatedMoment){
    if(err){
      console.log(err);
      return res.status(500).send();
    }
    console.log(updatedMoment);
    res.json(updatedMoment);
  });
}
//returns an object with key value pairs of lat lng
function getLatLng(strings){

  if(strings === 'unknown'){
    return strings;
  }

  var arr = strings.split('l');
  return {
    lat : parseFloat(arr[1]),
    lng: parseFloat(arr[2])
  }
}

module.exports = {
  allMoments: allMoments,
  post: post,
  delete: deleteMoment,
  updateMoment: updateMoment
};
