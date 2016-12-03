var express = require('express'),
    app = express();
var config = require('./config');

var db;

var logger = require('./logger'),
bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(logger);
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index.ejs');
});

app.get('/route1', function (req, res) {
  var cursor = db.collection('kiosked_script_formatter').find().toArray(function (err, result) {
    if (err) console.log(err)
    console.log(result);
    res.render('view1.ejs', { kiosked_script_formatter: result });
  });
});

app.get('/route2', function (req, res) {
  var cursor = db.collection('tweets').find().toArray(function (err, result) {
    if (err) console.log(err)
    console.log(result);
    res.render('view2.ejs', { tweets: result });
  });
});

app.post('/route1', function (req, res) {
  console.log('route1 post accessed successfully');
  res.redirect('/route1');
});

app.post('/route2', function (req, res) {
  console.log('route2 post accessed successfully');
  res.redirect('/route2');
});

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(config.mongolaburl, function(err, database) {
  if (err)
  console.log(err)
  db = database;
  app.listen(config.port, function() {
    console.log('Magic happens on port ' + config.port);
  });
});
