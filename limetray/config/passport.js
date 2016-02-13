var LocalStrategy = require ('passport-local').Strategy,
	User = require ('mongoose').model ('users');

module.exports = function (passport) {
	passport.serializeUser (function (user, done) {
		done (null, user.id);
	});
	passport.deserializeUser (function (id, done) {
		User.findById (id, function (err, user) {
			done (err, user);
		});
	});

	passport.use ('userLogin', new LocalStrategy ({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function (req, email, password, done) {
		User.findOne ({'local.email': email}, function (err, user) {
			if (err) {
				return (done (err));
			}
			if (!user) {
				return (done (null, false));
			}
			if (!user.validPassword (password)) {
				return (done (null, false));
			}
			return (done (null, user));
		});
	}));
};