var express = require('express'),
    router  = express.Router();

router.get('/users', function (req, res) {
  res.render('users.ejs');
});
router.post('/users', function (req, res) {
  var method = req.method;
  console.log('users' + method + 'hit');
  /* Do Something Cool */
});
router.put('/users', function (req, res) {
  var method = req.method;
  console.log('users' + method + 'hit');
  /* Do Something Cool */
});
router.delete('/users', function (req, res) {
  var method = req.method;
  console.log('users' + method + 'hit');
  /* Do Something Cool */
});

module.exports = router;
