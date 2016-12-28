var db = require('./models');

var momentsList = [{
    message: 'Today I witnessed an elderly lady crossing the street very slowly, when the cross walk light switched a man stopped to help escort her safely',
    location: 'South of Market',
    categories: ['inspiring', 'motivating', 'life changes', 'perspective']
}, {
    message: 'After years of being in and out of terrible relationships, playing the victim, and acting as a doormat for anyone willing to treat me as so, today is the day I stand up for myself, take responsibility for my life, and begin loving myself first and foremost',
    location: 'unknown',
    categories: ['life changes']
}];

var locationList = [{
    name: 'South of Market',
    coordinates: {
        lat: 37.7785,
        lng: -122.4056
    },
    moments: []
}, {
    name: 'Richmond District',
    coordinates: {
        lat: 37.7799,
        lng: -122.4647
    },
    moments: []
}, {
    name: 'Mission District',
    coordinates: {
        lat: 37.7599,
        lng: -122.4148
    },
    moments: []
}, {
    name: 'Financial District',
    coordinates: {
        lat: 37.7946,
        lng: -122.399
    },
    moments: []
}];

db.Moment.remove({}, function(err, moments) {
  console.log('removed moments');
  momentsList.forEach(function(moment) {
    // console.log(moment);
    db.Moment.create(moment);
  });
});

db.Locations.remove({}, function(err, locations) {
    locationList.forEach(function(location) {
        db.Locations.create(location);
    });
});
