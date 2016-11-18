var express = require('express'),
    app = express();

var db,
    url = "mongodb://localhost/test",
    port = process.env.PORT || 3000,
    logger = require('./logger'),
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
  res.redirect('/route1');
});
app.post('/route2', function (req, res) {
  res.redirect('/route2');
});


var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(url, function(err, database) {
  if (err)
  console.log(err)
  db = database;
  app.listen(port, function() {
    console.log('Magic happens on port ' + port);
  });
});
