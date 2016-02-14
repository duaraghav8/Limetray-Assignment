var dummyData = require ('../data/dummyData');

exports.loginGet = function (req, res) {
	if (req.user) {
		res.redirect ('/profile');
	}
	else {
		res.render ('index');
	}
};

exports.isLoggedIn = function (req, res, next) {
	if (req.isAuthenticated ()) {
		return (next ());
	}
	res.redirect ('/login');
};

exports.profileGet = function (req, res) {
	res.render ('profile', {
		username: req.user.local.email
	});
};

exports.logoutGet = function (req, res) {
	req.logout ();
	res.redirect ('/');
};

exports.signupGet = function (req, res) {
	res.render ('signup');
};

exports.billingAuth = function (req, res) {
	if (req.body.data.email === req.user.local.email && req.body.data.password === req.user.local.password) {
		res.json ({response: 'YES'});
	}
	else {
		res.json ({response: 'NO'});
	}
};

///////////////////////////////////////////////////////////////////////////////////////
//								API CONTROLLERS
///////////////////////////////////////////////////////////////////////////////////////

exports.categoryList = function (req, res) {
	var keys = Object.keys (dummyData),
		response = [];
	keys.forEach (function (key) {
		response.push ({data: key});
	});
	res.send (response);
};

exports.category = function (req, res) {
	res.send (dummyData [req.params.category]);
};

exports.notFound = function (req, res) {
	var message = 'Error 404: The Page you requested was not found on this server..';
	if (req.accepts ('html')) {
		res.render ('404', {
			ErrorMessage: message
		});
	}
	else {
		res.send (message);
	}
};