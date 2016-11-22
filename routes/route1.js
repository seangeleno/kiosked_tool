var express = require('express'),
    router  = express.Router();

router.get('/route1', function (req, res) {
  res.render('view1.ejs');
});
router.post('/route1', function (req, res) {
  var method = req.method;
  console.log('route1' + method + 'hit');
  /* Do Something Cool */
});
router.put('/route1', function (req, res) {
  var method = req.method;
  console.log('route1' + method + 'hit');
  /* Do Something Cool */
});
router.delete('/route1', function (req, res) {
  var method = req.method;
  console.log('route1' + method + 'hit');
  /* Do Something Cool */
});

module.exports = router;
