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
// GET '/challenges' =>
// Dynamic Routes
app.get('/challenges', function(req, resp){
  if(req.query.next === 'true'){
    var nextTwo = []
    nextTwo.push(challenges.shift());
    nextTwo.push(challenges.shift());
    resp.json(nextTwo);
  } else {
      var firstFour = [];
      for(var i = 0; i < 4; i++){
        firstFour.push(challenges.shift())
      }
      resp.json(firstFour);
    }
})

//app.get('/challenges?next=true', function(req, resp){

//})

var port = 3000;
app.listen(port, function(){
  console.log("listening on port " + port);
});
