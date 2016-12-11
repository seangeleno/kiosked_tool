var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var dotenv = require('dotenv');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var MongoClient = require('mongodb').MongoClient;
var port = process.env.PORT || 3000;

dotenv.load();

var routes = require('./routes/index');
var user = require('./routes/user');
var chat = require('./routes/chat');
var tickets = require('./routes/tickets');
var scripts = require('./routes/scripts');
var documentation = require('./routes/documentation');
var about = require('./routes/about');


var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback',
  MONGO_PROD: process.env.MONGO_PROD,
  MONGO_DEV: process.env.MONGO_DEV
};
console.log(env);

var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

// This will configure Passport to use Auth0
var strategy = new Auth0Strategy({
    domain:       process.env.AUTH0_DOMAIN,
    clientID:     process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:  process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

passport.use(strategy);

// you can use this section to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'K!9NJssQ*xvT',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/user', user);
app.use('/chat', chat);
app.use('/tickets', tickets);
app.use('/scripts', scripts);
app.use('/documentation', documentation);
app.use('/about', about);

//app.use(express.static('public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var db;
MongoClient.connect( env.MONGO_PROD, function(err, database) {
    if (err)
        console.log(err)
    db = database;
    app.listen( port, function() {
        console.log('Magic happens on port ' + port + " also, connected to " + env.MONGO_PROD);
    });
});

module.exports = app;
