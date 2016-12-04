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

app.get('/users', function (req, res) {
  var cursor = db.collection('users').find().toArray(function (err, result) {
    if (err) console.log(err)
    console.log(result);
    res.render('users.ejs', { users: result });
  });
});

app.get('/script_formatter', function (req, res) {
  var cursor = db.collection('script_formatter').find().toArray(function (err, result) {
    if (err) console.log(err)
    console.log(result);
    res.render('script_formatter.ejs', { script_formatter: result });
  });
});

app.post('/users', function (req, res) {

  console.log(req.body);

  db.collection('users').save(req.body, function (err, result) {
    if (err) return console.log(err);
    console.log('users route accessed successfully!');
  });
  res.redirect('/users');
});

app.post('/script_formatter', function (req, res) {

  console.log(req.body);
  db.collection.save(req.body, function (err, result) {
    if (err) return console.log(err)
    console.log('script_formatter posted successfully!!!');
  });
  res.redirect('/script_formatter');
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
