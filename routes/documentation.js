var express = require('express'),
    router  = express.Router();

router.get('/', function (req, res) {
  res.render('documentation.ejs')
});

module.exports = router;
