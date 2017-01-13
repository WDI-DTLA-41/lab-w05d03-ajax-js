var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

// middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Static Routes
// GET '/' => '/public/index.html'
app.use(express.static(__dirname + '/public'));

// Data
var challenges = require('./lib/challenges');
challenges.forEach(function(ind){
  if(ind.id === 6 ){
    var value = new Buffer(ind.body, 'base64').toString("ascii");
    ind.body = value;
  } else if(ind.id >= 8){
      //var value = new Buffer(ind.body, 'base64').toString("ascii");
      var value = new Buffer(ind.body, 'base64').toString("ascii");
      ind.body = value;
    }
})


// GET '/challenges' =>
// Dynamic Routes
app.get('/challenges', function(req, resp){
  if(req.query.next === 'true'){
    var nextTwo = [];
    var valueOne = challenges.shift();
    var valueTwo = challenges.shift();
    nextTwo.push(valueOne);
    nextTwo.push(valueTwo);

    resp.json(nextTwo);
  } else {
      var firstFour = [];
      for(var i = 0; i < 4; i++){
        firstFour.push(challenges.shift())
      }
      resp.json(firstFour);
    }
})



var port = 3000;
app.listen(port, function(){
  console.log("listening on port " + port);
});
