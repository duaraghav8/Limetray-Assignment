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
	console.log ('New Log In:\n', req.user);
	
	res.render ('profile', {
		username: req.user.local.email
	});
};

exports.logoutGet = function (req, res) {
	req.logout ();
	res.redirect ('/');
};