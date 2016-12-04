var express = require('express'),
    router  = express.Router();

router.get('/route3', function (req, res) {
  res.render('script_formatter.ejs');
});
router.post('/route3', function (req, res) {
  var method = req.method;
  console.log('route3' + method + 'hit');
  /* Do Something Cool */
});
router.put('/route3', function (req, res) {
  var method = req.method;
  console.log('route3' + method + 'hit');
  /* Do Something Cool */
});
router.delete('/route3', function (req, res) {
  var method = req.method;
  console.log('route3' + method + 'hit');
  /* Do Something Cool */
});

module.exports = router;
