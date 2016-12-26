var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    controllers = require('./controllers');

//serve static files from public folder
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
//set default get path
app.get('/', function(req, res) {
    res.sendFile('views/index.html', {
        root: __dirname
    });
})

//get path for retrieving all moments
app.get('/api/moments', controllers.moments.allMoments);

//post path for adding a moment
app.post('/api/moments', controllers.moments.post).post(controllers.locations.update);

//GET path for all Locations
app.get('/api/locations', controllers.locations.allLocations);
//GET path for all of a locations moments with params name
app.get('/api/locations/:name', controllers.locations.getLocMoments);

//server listen to env port or local 3000
app.listen(process.env.port || 3000, function() {
    console.log('listening on port 3k')
})
