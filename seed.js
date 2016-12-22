var db = require('./models');

var momentsList = [{
    message: 'Today I witnessed an elderly lady crossing the street very slowly, when the cross walk light switched a man stopped to help escort her safely',
    location: 'SOMA',
    categories: ['inspiring', 'motivating', 'life changes', 'perspective']
},
{
  message: 'After years of being in and out of terrible relationships, playing the victim, and acting as a doormat for anyone willing to treat me as so, today is the day I stand up for myself, take responsibility for my life, and begin loving myself first and foremost',
  location: 'unknown',
  categories: ['life changes']
}
]

db.Moment.remove({}, function(err, moments){
  console.log('removed moments');
  momentsList.forEach(function(moment){
    // console.log(moment);
    db.Moment.create(moment);
  });
  console.log(db.Moment.find({}));
})
