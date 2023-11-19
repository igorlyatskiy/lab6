const cors = require('cors');
const express = require('express');
const joi = require('joi');
require('dotenv').config();

const config = require('./config');
const configValidator = require('./config/config.validation');
const logger = require('./common/logger')('app');
const { sequelize } = require('./models/index');


const usersController = require('./controllers/users');

const PORT = config.app.port || 8080;

class App {
	constructor() {
		this.checkServerConfig();

		this.express = new express();
		this.express.use(express.json());

		this.express.use(cors());

		this.express.use('/users', usersController);

		this.express.use((req, res, next) => {
			res.status(404).send('Not found');
		});

		this.express.listen(PORT, () => {
			logger.info(`Server has successfully started on port ${PORT}`);
		});

		this.checkPgConnect();
	}

	async checkPgConnect() {
		try {
			await sequelize.authenticate();
			logger.info('Connection has been established successfully');
		} catch (error) {
			logger.error('Unable to connect to the database:', error);

			return process.exit();
		}
	}

	checkServerConfig() {
		try {
			joi.assert(config, configValidator);
		} catch (validationError) {
			logger.error('Configuration is not valid', validationError);

			return process.exit();
		}
	}
}

module.exports = App;