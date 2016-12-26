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
  //seperates categories into array element by comma
  // var categorySplit = req.body.categories.split(',');
  // req.body.categories = categorySplit;
  console.log(req.body);
  var newMoment = new db.Moment(req.body);
  newMoment.save(function(err, saveMoment){
      if(err){
        console.log('error on moment save', err);
      }
      else{
        res.json(saveMoment);
      }
  })
}
module.exports = {
  allMoments: allMoments,
  post: post
};
