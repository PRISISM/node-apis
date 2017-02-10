moment = require('moment');

module.exports.handleGet = function(req, res) {
	var d = req.params.str; // timestamp
	var unixTime = null;
	var naturalTime = null;

	// Checking for unix time
	if (+d >=0 ) {
		unixTime = +d; // Using numerical representation
		naturalTime = unixToNat(unixTime);
	}

	else if (moment(d, "MMMM D, YYYY").isValid()) {
		unixTime = natToUnix(d);
		naturalTime = unixToNat(unixTime);
	}

	var dateObj = {"unix" : unixTime, "natural": naturalTime};
	res.json(dateObj);
};

/* Takes a natural date and returns a unix timestamp */
function natToUnix(date) {
	return moment(date, "MMM D, YYYY").format("X");
}

/* Takes a unix time and returns a natural date */
function unixToNat(time) {
	return moment.unix(time).format("MMM D, YYYY");
}