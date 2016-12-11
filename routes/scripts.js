var express = require('express'),
    router  = express.Router();

router.get('/', function(req, res) {

    var cursor = db.collection('scripts').find().sort({"_id": -1}).limit(3).toArray(function(err, result) {
            if (err)
                console.log(err)
            console.log(result);
            res.render('scripts.ejs', {scripts: result});
        });
  });
router.post('/', function(req, res) {

      var requestBody = {
          url: req.body.url,
          pubID: req.body.pubID,
          siteID: req.body.siteID,
          region: req.body.region,
          device: req.body.device,
          ad_size: req.body.ad_size,
          ad_unit: req.body.ad_unit,
          hardcodedScriptDeprecatedUsesPubIDAsPerTimoAndDaniel: function(url, pubID, siteID) {

              var beginNote = "<!-- Begin Kiosked - ",
                  untilPub = " -->\ <script type='text/javascript' async='async' src='//scripts.kiosked.com/loader/kiosked-loader.js?pub=",
                  postPub = "&site=",
                  postSite = "'></script>\<!-- End Kiosked - ",
                  lastPart = " -->",
                  wholeScript = beginNote + req.body.url + untilPub + pubID + postPub + siteID + postSite + req.body.url + lastPart;
              wholeScript.replace(/\"/g, "");

              return wholeScript;

          },
          hardcodedScript: function(url, siteID) {

              var beginNote = "<!-- Begin Kiosked - ",
                  untilSite = " -->\n  <script type='text/javascript'>window.__ITGS_started = Date.now();</script>\n  <script type='text/javascript' async='async' src='//scripts.kiosked.com/loader/kiosked-loader.js?site=",
                  postSite = "'></script>\n<!-- End Kiosked - ",
                  lastPart = " -->",
                  wholeScript = beginNote + req.body.url + untilSite + siteID + postSite + req.body.url + lastPart;
              wholeScript.replace(/\"/g, "");

              return wholeScript;

          },
          dfpFormattedScript: function(pubID, siteID) {
              var beginning = "<script type='text/javascript'>\ var pubId ='",
                  middle = "';\ var siteId ='",
                  end = "';\ var kioskedscript = document.createElement('script');\ kioskedscript.setAttribute('async', 'async');\ kioskedscript.setAttribute('src', '//scripts.kiosked.com/loader/kiosked-loader.js?pub=' + pubId + '&site=' + siteId);\ kioskedscript.setAttribute('type', 'text/javascript');\ var anonscript = document.createElement('script');\ anonscript.setAttribute('async', 'async');\ anonscript.setAttribute('src', '//anonymousdemographics.com/u?pub=' + pubId + '&site=' + siteId + '&ts=0&_response_content_type=js');\ anonscript.setAttribute('type', 'text/javascript');\ window.top.document.body.appendChild(kioskedscript);\ window.top.document.body.appendChild(anonscript);\ </script>",
                  wholeScript = beginning + pubID + middle + siteID + end;
              wholeScript.replace(/\"/g, "");

              return wholeScript;

          },
          injectScript: function(siteID) {

              var beginNote = "window.__ITGS_started = Date.now();\n(function(h, s) { s.src = '//scripts.kiosked.com/loader/kiosked-loader.js?site=",
                  endNote = "';\ns.async = 'async'; h.appendChild(s); })(window.top.document.head, window.top.document.createElement('script'))",
                  wholeScript = beginNote + siteID + endNote;
              return wholeScript;

          },
          section_layout: function(region, url, publisher_name, ad_size) {
              var pubName = req.body.publisher_name;
              pubName.replace(/\s+/g, '_');
              var sectionLayoutFormatted = region + "_" + url + "_" + pubName + "_" + ad_size;

              return sectionLayoutFormatted;
          },
          campaign: function(region, url) {
              var campaign = region + "_" + url + "_Kiosked";;
              return campaign;
          },
          section: function(region, url, ad_size) {
              var section = region + "_" + url + "_" + ad_size + "_" + req.body.device;
              return section;
          },
          line_item: function(region, url, ad_size) {
              var line_item = region + "_" + url + "_" + ad_size + "_Kiosked";;
              return line_item;
          },
          creative: function(region, url, ad_size) {
              var creativeFormatted = region + "_" + url + "_" + ad_size + "_Kiosked";;
              return creativeFormatted;
          },
          mustFormattedScript: function(url, ad_unit, device, ad_size) {
              var mustFormatted = url + " - " + req.body.ad_type + " - " + ad_size;
              return mustFormatted;
          }
      };

      console.log(req.body);

      db.collection('scripts').save(requestBody, function(err, result) {
          if (err)
              return console.log(err)


      });
      console.log('scripts posted successfully!!!');
      res.redirect('/scripts');
  });

module.exports = router;
