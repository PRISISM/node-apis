var express = require('express');
var path = require('path');
var routes = require('./app/routes/index.js');
var api = require('./app/api/apis.js');

require('dotenv').config({
	silent:true
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', routes);
app.use('/api', api);

var port = process.env.port || 8080;
app.listen(port, function() {
	console.log("Now listening on port " + port);
});