var express = require('express'),
    router  = express.Router();

router.get('/', function(req, res) {

        res.render('about.ejs');

  });



module.exports = router;
