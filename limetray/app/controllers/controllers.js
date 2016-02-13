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