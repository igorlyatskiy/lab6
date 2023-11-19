const database = require('./database');

const configuration = {
	db: database,
	logger: {
		debug: !!process.env.DEBUG
	},
	app: {
		host: process.env.APP_HOST || 'localhost',
		port: process.env.APP_PORT || 8080,
	},
};

module.exports = configuration;