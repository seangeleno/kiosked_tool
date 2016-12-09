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

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.get('/users', function(req, res) {
    var cursor = db.collection('users').find().toArray(function(err, result) {
        if (err)
            console.log(err)
        console.log(result);
        res.render('users.ejs', {users: result});
    });
});

app.get('/script_formatter', function(req, res) {

    var cursor = db.collection('script_formatter').find().sort({"_id": -1}).limit(3).toArray(function(err, result) {
        if (err)
            console.log(err)
        console.log(result);
        res.render('script_formatter.ejs', {script_formatter: result});
    });
});

app.get('/documentation', function(req, res) {
    var cursor = db.collection('documentation').find().toArray(function(err, result) {
        if (err)
            return console.log(err)
        console.log(result);
        res.render('documentation.ejs', {documentation: result});
    });
});

app.get('/tickets', function(req, res) {
    var cursor = db.collection('tickets').find().toArray(function(err, result) {
        if (err)
            console.log(err)
        console.log(result);
        res.render('tickets.ejs', {tickets: result});
    });
});

app.get('/chat', function(req, res) {
    var cursor = db.collection('chat').find().toArray(function(err, result) {
        if (err)
            console.log(err)
        console.log(result);
        res.render('chat.ejs', {chat: result});
    });
});

app.get('/about', function(req, res) {
    var cursor = db.collection('about').find().toArray(function(err, result) {
        if (err)
            console.log(err)
        console.log(result);
        res.render('about.ejs', {about: result});
    });
});

/* GET ROUTES*/

/*POST ROUTES*/

app.post('/users', function(req, res) {

    console.log(req.body);

    db.collection('users').save(req.body, function(err, result) {
        if (err)
            return console.log(err);
        console.log('users route accessed successfully!');
    });
    res.redirect('/users');
});

app.post('/script_formatter', function(req, res) {
    var allScriptsAndFormats = {clientScripts, internalFormats, must};
    var clientScripts = {};
    clientScripts.hardcodedScriptDeprecatedUsesPubIDAsPerTimoAndDaniel = function(url, pubID, siteID) {

            var beginNote = "<!-- Begin Kiosked - ",
                untilPub = " -->\ <script type='text/javascript' async='async' src='//scripts.kiosked.com/loader/kiosked-loader.js?pub=",
                postPub = "&site=",
                postSite = "'></script>\<!-- End Kiosked - ",
                lastPart = " -->",
                wholeScript = beginNote + url + untilPub + pubID + postPub + siteID + postSite + url + lastPart;
            wholeScript.replace(/\"/g, "");

            return wholeScript;

        };
    clientScripts.hardcodedScript = function(url, siteID) {

            var beginNote = "<!-- Begin Kiosked - ",
                untilSite = " -->\n  <script type='text/javascript'>window.__ITGS_started = Date.now();</script>\n  <script type='text/javascript' async='async' src='//scripts.kiosked.com/loader/kiosked-loader.js?site=",
                postSite = "'></script>\n<!-- End Kiosked - ",
                lastPart = " -->",
                wholeScript = beginNote + url + untilSite + siteID + postSite + url + lastPart;
            wholeScript.replace(/\"/g, "");

            return wholeScript;

          }
    clientScripts.dfpFormattedScript = function(pubID, siteID) {
            var beginning = "<script type='text/javascript'>\ var pubId ='",
                middle = "';\ var siteId ='",
                end = "';\ var kioskedscript = document.createElement('script');\ kioskedscript.setAttribute('async', 'async');\ kioskedscript.setAttribute('src', '//scripts.kiosked.com/loader/kiosked-loader.js?pub=' + pubId + '&site=' + siteId);\ kioskedscript.setAttribute('type', 'text/javascript');\ var anonscript = document.createElement('script');\ anonscript.setAttribute('async', 'async');\ anonscript.setAttribute('src', '//anonymousdemographics.com/u?pub=' + pubId + '&site=' + siteId + '&ts=0&_response_content_type=js');\ anonscript.setAttribute('type', 'text/javascript');\ window.top.document.body.appendChild(kioskedscript);\ window.top.document.body.appendChild(anonscript);\ </script>",
                wholeScript = beginning + pubID + middle + siteID + end;
            wholeScript.replace(/\"/g, "");

            return wholeScript;

        };

    var internalFormats = {};
    internalFormats.injectScript = function(siteID) {

        var beginNote = "window.__ITGS_started = Date.now();\n(function(h, s) { s.src = '//scripts.kiosked.com/loader/kiosked-loader.js?site=",
            endNote = "';\ns.async = 'async'; h.appendChild(s); })(window.top.document.head, window.top.document.createElement('script'))",
            wholeScript = beginNote + siteID + endNote;
        return wholeScript;

      };
    internalFormats.ksspFormatFunctions = {

        section_layout: function(region, url, publisher_name, placement_size) {
            var pubName = req.body.publisher_name;
            pubName.replace(/\s+/g, '_');
            var sectionLayoutFormatted = req.body.region + "_" + req.body.url + "_" + pubName + "_" + req.body.placement_size;

            return sectionLayoutFormatted;
        },
        campaign: function(region, url) {
            var campaign = req.body.region + "_" + req.body.url + "_" + "Kiosked";;
            return campaign;
          },
        section: function(region, url, placement_size) {
            var section = req.body.region + "_" + req.body.url + "_" + req.body.placement_size + "_" + req.body.device;
            return section;
        },
        line_item: function(region, url, placement_size) {
            var line_item = req.body.region + "_" + req.body.url + "_" + req.body.placement_size + "Kiosked";;
            return line_item;
        },
        creative: function(region, url, placement_size) {
            var creativeFormatted = req.body.region + "_" + req.body.url + "_" + req.body.placement_size + "_" + "Kiosked";;
            return creativeFormatted;
        },

    };
    internalFormats.ksspFormat = {

        region: req.body.region,
        publisher_name: req.body.publisher_name,
        section_layout: ksspFormatted.section_layout(req.body.region, req.body.publisher_name, req.body.placement_size),
        section: ksspFormatted.section(req.body.region, req.body.url),
        campaign: ksspFormatted.campaign(req.body.region, req.body.url, "Kiosked"),
        line_item: ksspFormatted.line_item(req.body.region, req.body.url, req.body.placement_size),
        creative: ksspFormatted.creative(req.body.region, req.body.url, req.body.placement_size)

    };
    internalFormats.inputNewSite = {
        url: req.body.url,
        pubID: req.body.pubID,
        siteID: req.body.siteID,
        ad_unit: req.body.ad_unit,
        device: req.body.device,
        placement_size: req.body.placement_size,
    };

    var must = {};
    must.mustFormattedScript = function  (url, ad_unit, device, placement_size) {
              var mustFormatted = req.body.url + " - " + req.body.ad_type + " - " + req.body.placement_size;
              return mustFormatted;
          };
    must.mustFormatted = this.mustFormattedScript(req.body.url, req.body.ad_unit, req.body.device, req.body.placement_size);

    console.log(req.body);

    db.collection('script_formatter').save(allScriptsAndFormats, function(err, result) {
        if (err) return console.log(err)

        console.log('script_formatter posted successfully!!!');

    });
    res.redirect('/script_formatter');
});

app.post('/documentation', function(req, res) {

    console.log(req.body);

    db.collection('documentation').save(req.body, function(err, result) {
        if (err)
            return console.log(err);
        console.log('documentation route accessed successfully!');
    });
    res.redirect('/documentation');
});

app.post('/tickets', function(req, res) {

    console.log(req.body);
    db.collection('tickets').save(req.body, function(err, result) {
        if (err)
            return console.log(err)
        console.log('tickets posted successfully!!!');
    });
    res.redirect('/tickets');
});

app.post('/chat', function(req, res) {

    console.log(req.body);
    db.collection('chat').save(req.body, function(err, result) {
        if (err)
            return console.log(err)
        console.log('chat saved successfully!!!');
    });
    res.redirect('/chat');
});

app.post('/about', function(req, res) {

    console.log(req.body);
    db.collection('about').save(req.body, function(err, result) {
        if (err)
            return console.log(err)
        console.log('about saved successfully!!!');
    });
    res.redirect('/about');
});

/*POST ROUTES*/

var MongoClient = require('mongodb').MongoClient;

// MongoClient.connect(process.env.PROD_MONGODB, function(err, database) {
//     if (err)
//         console.log(err)
//     db = database;
//     app.listen(process.env.PORT, function() {
//         console.log('Magic happens on port ' + process.env.PORT);
//     });
// });
MongoClient.connect(config.mongolaburl, function(err, database) {
    if (err)
        console.log(err)
    db = database;
    app.listen(config.port, function() {
        console.log('Magic happens on port ' + config.port);
    });
});
