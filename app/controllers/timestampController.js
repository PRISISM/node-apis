module.exports.handleGet = function(req, res) {
	var d = req.params.str; // timestamp
	var unixTime = null;
	var naturalTime = null;
	
	if ( Object.prototype.toString.call(d) === "[object Date]" ) {
	  // it is a date
	  if ( isNaN( d.getTime() ) ) {  // d.valueOf() could also work
	  	console.log(d);
	    // date is not valid
	  }
	  else {
	  	console.log(d);
	  	res.json(d);
	    // date is valid
	  }
	}
	else {
		console.log(d);
	  // not a date
	}
};
