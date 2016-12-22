var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

//serve static files from public folder
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
//set default get path
app.get('/', function(req, res) {
    res.sendFile('views/index.html', {
        root: __dirname
    });
})

//server listen to env port or local 3000
app.listen(process.env.port || 3000, function() {
    console.log('listening on port 3k')
})
