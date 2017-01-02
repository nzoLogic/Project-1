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
app.post('/api/moments', controllers.moments.post);

//delete path for deling moment by id
app.delete('/api/moments/:id', controllers.moments.delete);

//put path for updating moment by id
app.put('/api/moments/:id', controllers.moments.updateMoment);
//server listen to env port or local 3000
app.listen(process.env.port || 3000, function() {
    console.log('listening on port 3k')
})
