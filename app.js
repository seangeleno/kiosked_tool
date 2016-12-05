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

/* GET ROUTES*/

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

app.get('/documentation', function (req, res) {
  var cursor = db.collection('documentation').find().toArray(function (err, result) {
    if (err) return console.log(err)
    console.log(result);
    res.render('documentation.ejs', { documentation: result });
  });
});

app.get('/tickets', function (req, res) {
  var cursor = db.collection('tickets').find().toArray(function (err, result) {
    if (err) console.log(err)
    console.log(result);
    res.render('tickets.ejs', { tickets: result });
  });
});

app.get('/chat', function (req, res) {
  var cursor = db.collection('chat').find().toArray(function (err, result) {
    if (err) console.log(err)
    console.log(result);
    res.render('chat.ejs', { chat: result });
  });
});

app.get('/about', function (req, res) {
  var cursor = db.collection('about').find().toArray(function (err, result) {
    if (err) console.log(err)
    console.log(result);
    res.render('about.ejs', { about: result });
  });
});

/*POST ROUTES*/

app.post('/users', function (req, res) {

  console.log(req.body);

  db.collection('users').save(req.body, function (err, result) {
    if (err) return console.log(err);
    console.log('users route accessed successfully!');
  });
  res.redirect('/users');
});

app.post('/script_formatter', function (req, res) {

  var inputNewSite = {
        url: req.body.url,
        pubID: req.body.pubID,
        siteID: req.body.siteID,
        // script_for_publisher: dfpFormattedScript(req.body.siteID, req.body.pubID, req.body.siteID)
    };

  console.log(req.body);
  db.collection('script_formatter').save(inputNewSite, function (err, result) {
    if (err) return console.log(err)
    console.log('script_formatter posted successfully!!!');
  });
  res.redirect('/script_formatter');
});

app.post('/documentation', function (req, res) {

  console.log(req.body);

  db.collection('documentation').save(req.body, function (err, result) {
    if (err) return console.log(err);
    console.log('documentation route accessed successfully!');
  });
  res.redirect('/documentation');
});

app.post('/tickets', function (req, res) {

  console.log(req.body);
  db.collection('tickets').save(req.body, function (err, result) {
    if (err) return console.log(err)
    console.log('tickets posted successfully!!!');
  });
  res.redirect('/tickets');
});

app.post('/chat', function (req, res) {

  console.log(req.body);
  db.collection('chat').save(req.body, function (err, result) {
    if (err) return console.log(err)
    console.log('chat saved successfully!!!');
  });
  res.redirect('/chat');
});

app.post('/about', function (req, res) {

  console.log(req.body);
  db.collection('about').save(req.body, function (err, result) {
    if (err) return console.log(err)
    console.log('about saved successfully!!!');
  });
  res.redirect('/about');
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
