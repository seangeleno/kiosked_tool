var express = require('express'),
    router  = express.Router();

router.get('/script_formatter', function (req, res) {
  res.render('script_formatter.ejs');
});
router.post('/script_formatter', function (req, res) {
  var method = req.method;
  console.log('script_formatter' + method + 'hit');
  /* Do Something Cool */
});
router.put('/script_formatter', function (req, res) {
  var method = req.method;
  console.log('script_formatter' + method + 'hit');
  /* Do Something Cool */
});
router.delete('/script_formatter', function (req, res) {
  var method = req.method;
  console.log('script_formatter' + method + 'hit');
  /* Do Something Cool */
});

module.exports = router;
