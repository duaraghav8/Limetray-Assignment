var controllers = require ('../controllers/controllers');

module.exports = function (app, passport) {
	app
		.get ('/', controllers.loginGet)
		.get ('/login', controllers.loginGet)
		.post ('/login', passport.authenticate ('userLogin', {
			successRedirect: '/profile',
			failureRedirect: '/login'
		}))
		.get ('/profile', controllers.isLoggedIn, controllers.profileGet)
		.get ('/logout', controllers.logoutGet);
/*		.post ('/login', controllers.loginPost)
		.get ('/signup', controllers.signupGet)
		.post ('/signup', controllers.signupPost);
*/
	return (app);	//for chainability
};