var express = require('express'),
    router  = express.Router();

router.get('/route2', function (req, res) {
  res.render('view2.ejs');
});
router.post('/route2', function (req, res) {
  var method = req.method;
  console.log('route2' + method + 'hit');
  /* Do Something Cool */
});
router.put('/route2', function (req, res) {
  var method = req.method;
  console.log('route2' + method + 'hit');
  /* Do Something Cool */
});
router.delete('/route2', function (req, res) {
  var method = req.method;
  console.log('route2' + method + 'hit');
  /* Do Something Cool */
});

module.exports = router;
