var express = require('express');
var path = require('path');
var routes = require('./app/routes/index.js');
var api = require('./app/api/apis.js');
var mongodb = require('mongodb');

require('dotenv').config({
	silent: true
});

var app = express();

// db setup
mongodb.MongoClient.connect(process.env.database, function(err, db) {
	if (err)
		throw err;
	else
		console.log('Connected to MongoDB');

	app.db = db;

	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'pug');

	// routes setup
	app.use('/', routes);
	app.use('/api', api);

	db.createCollection("urls", {
		capped: true,
		size: 5242880,
		max: 5000
	});

	var port = process.env.PORT || 8080;
	var server = app.listen(port, function() {
		console.log("Now listening on port " + port);
	});

});