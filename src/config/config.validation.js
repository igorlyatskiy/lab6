const Joi = require('joi');

const configSchema = Joi.object({
	db: Joi.object({
		username: Joi.string().required(),
		password: Joi.string().required(),
		database: Joi.string().required(),
		host: Joi.string().required(),
		port: Joi.number().required(),
		dialect: Joi.string().required()
	}).required(),

	logger: Joi.object({
		debug: Joi.boolean().required()
	}).required(),

	app: Joi.object({
		host: Joi.string().required(),
		port: Joi.number().required(),
	}).required(),
});

module.exports = configSchema;
