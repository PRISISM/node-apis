var express = require('express');
timestampController = require('../controllers/timestampController');

var router = express.Router();


router.get('/me', function(req, res) {
	var apiObject = {};
	apiObject.ipaddress = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
	apiObject.language = req.headers['accept-language'];
	apiObject.software = req.headers['user-agent'];
	res.json(apiObject);
});

router.get('/timestamp/:str', timestampController.handleGet);

module.exports = router;