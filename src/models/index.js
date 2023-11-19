'use strict';

const Sequelize = require('sequelize');

const config = require('../config');
const logger = require('../common/logger')('sequelize');

const dbConfig = config.db;
const db = {};

logger.info(`Connecting to the host - [ ${dbConfig.host} ], database - [ ${dbConfig.database} ]`);

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
	dialect: dbConfig.dialect,
	host: dbConfig.host,
	port: dbConfig.port,
	logging: (msg) => logger.trace(msg)
});

db.users = require('./users.model')(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;