var express = require('express');
var headerController = require('../controllers/headerController');
var timestampController = require('../controllers/timestampController');

var router = express.Router();

router.get('/me', headerController.handleGet);
router.get('/timestamp/:str', timestampController.handleGet);

module.exports = router;