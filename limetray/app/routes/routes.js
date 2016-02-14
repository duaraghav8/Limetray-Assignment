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
		.get ('/logout', controllers.logoutGet)
		
		.get ('/signup', controllers.signupGet)
		.post ('/signup', passport.authenticate ('signup', {
			successRedirect: '/profile',
			failureRedirect: '/signup'
		}))

		.post ('/billingAuth', controllers.billingAuth);

///////////////////////////////////////////////////////////////////////////////////////
//								API ROUTES
///////////////////////////////////////////////////////////////////////////////////////

	app
		.get ('/api/', controllers.categoryList)
		.get ('/api/:category', controllers.category);

//Requested Page was not found
	app.get ('*', controllers.notFound);
		
	return (app);	//for chainability
};