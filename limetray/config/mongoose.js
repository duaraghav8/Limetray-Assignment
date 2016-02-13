var mongoose = require ('mongoose'),
		config = require ('./config'),
		dbObject = null;

module.exports = function () {
	dbObject = mongoose.connect (config.dbURL);
	mongoose.connection.once ('open', function () {
		console.log ('Mongoose Connection established');
	});
	require ('../app/models/users');

	return (dbObject);
};