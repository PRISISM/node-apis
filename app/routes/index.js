var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
	res.render('index', {
		path: req.protocol + '://' + req.hostname
	});
});

module.exports = router;