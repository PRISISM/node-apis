var express = require('express');
var headerController = require('../controllers/headerController');
var timestampController = require('../controllers/timestampController');
var urlController = require('../controllers/urlController');

var router = express.Router();

router.get('/me', headerController.handleGet);
router.get('/timestamp/:str', timestampController.handleGet);

router.get('/url/new/*', urlController.handleNew);
router.get('/url/:str', urlController.handleGet);

module.exports = router;