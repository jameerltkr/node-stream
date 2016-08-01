var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Configure System' });
});

router.get('/conference', function (req, res, next) {
    res.render('conference', { title: 'Start a conferencing' });
});

module.exports = router;
