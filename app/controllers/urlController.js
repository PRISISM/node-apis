var adjectiveAdjectiveAnimal = require('adjective-adjective-animal');
var mongodb = require('mongodb');

module.exports.handleGet = function(req, res) {
	var url = req.protocol + '://' + req.get('host') + '/api/url/' + req.params.str;
	console.log(url);
	findUrl(url, req.app.db, res);
};

module.exports.handleNew = function(req, res) {
	var url = req.params[0];
	console.log(req.params, url);
	var urlObj = {}; 
	if (validateURL(url)) {
		adjectiveAdjectiveAnimal().then(function(data) {
			urlObj = {
				"original": url,
				"short": req.protocol + '://' + req.get('host') + '/api/url/' + data
			};
			console.log(urlObj);
			res.send(urlObj);
			makeUrl(urlObj, req.app.db);
		});
	}
	else {
		urlObj = {"error" : "Wrong url format!"};
		res.send(urlObj);
	}
};

function makeUrl(obj, db) {
	var urls = db.collection('urls');
	urls.save(obj, function(err, result) {
		if (err)
			throw err;
		console.log('Saved ' + result);
	});
}

function findUrl(url, db, res) {
	var urls = db.collection('urls');

	urls.findOne({
		'short': url
	}, function(err, result) {
		if (err)
			throw err;
		if (result) {
			console.log('Found: ' + result);
			console.log('Redirecting to: ', result.original);
			res.redirect(result.original);
		}
		else {
			res.send({
				'error': 'This url is not on the database'
			});
		}
	});
}

function validateURL(url) {
	// Checks to see if it is an actual url
	// Regex from https://gist.github.com/dperini/729294
	var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
	return regex.test(url);
}