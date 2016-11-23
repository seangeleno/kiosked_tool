var express = require('express'),
    app = express();
var config = require('./myconfig');

var db,
    url = config.db.database + "://" + config.db.localhost + "/" + config.db.local_db_name,
    mongolaburl = config.mongolab.database + "://" + config.mongolab.username + ":" + config.mongolab.password + "@" + config.mongolab.host + ":" + config.mongolab.port + "/" + config.mongolab.name;

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
  res.render('view1.ejs');
});
app.get('/route2', function (req, res) {
  res.render('view2.ejs');
});
app.post('/route1', function (req, res) {
  console.log('route1 post accessed successfully');
  res.redirect('/route1');
});
app.post('/route2', function (req, res) {
  console.log('route2 post accessed successfully');
  res.redirect('/route2');
});

var localurl = config.db.database + "://" + config.db.host + "/" + config.db.name;

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(localurl, function(err, database) {
  if (err)
  console.log(err)
  db = database;
  app.listen(config.server.port, function() {
    console.log('Magic happens on port ' + config.server.port);
  });
});
