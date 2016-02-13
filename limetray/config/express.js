var express = require ('express'),
	bodyParser = require ('body-parser'),
	serveStatic = require ('serve-static'),
	cookieParser = require ('cookie-parser'),
	session = require ('express-session'),
	passport = require ('passport'),
	config = require ('./config'),
	dbObject = require ('./mongoose') (),
	app = express ();

module.exports = function () {
	require ('./passport') (passport);

	app
		.use (bodyParser.urlencoded ({extended: true}))
		.use (serveStatic (__dirname + '/../public'))
		.use (cookieParser ())
		.use (session ({
			secret: config.sessionSecret,
			resave: true,
			saveUninitialized: true
		}))
		.use (passport.initialize ())
		.use (passport.session ())
		.set ('views', __dirname + '/../public/views')
		.set ('view engine', 'ejs');

	require ('../app/routes/routes') (app, passport);

	if (process.env.NODE_ENV == 'development') {
		console.log ('We\'re in Development Environment');
	}
	if (process.env.NODE_ENV == 'production') {
		console.log ('We\'re in Production Environment');
	}

	return (app);
};