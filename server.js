var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
//allow index access to public
app.use(express.static('public'));
//set default get path
app.get('/', function(req, res){
  res.sendFile('views/index.html', {root: __dirname});
})

    app.listen(process.env.port || 3000, function(){
      console.log('listening on port 3k')
    })
