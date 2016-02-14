var controllers = require ('../controllers/controllers');

module.exports = function (app, passport) {
	//uncomment the chunk below if your browser console throws "Access-Control-Allow-Origin" Error

	/*
		app.use(function (req, res, next) {
    		// Website you wish to allow to connect
    		res.setHeader('Access-Control-Allow-Origin', '*');

    		// Request methods you wish to allow
    		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    		// Request headers you wish to allow
    		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    		// Set to true if you need the website to include cookies in the requests sent
    		// to the API (e.g. in case you use sessions)
    		res.setHeader('Access-Control-Allow-Credentials', true);

    		// Pass to next layer of middleware
    		next();
		});
	*/

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
