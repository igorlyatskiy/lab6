const Joi = require('joi');

const updateUserSchema = Joi.object({
	nickname: Joi.string()
		.min(3)
		.max(40)
		.required(),

	phone: Joi.string()
		.min(3)
		.max(15)
		.required(),

	email: Joi.string().email().required(),

	role: Joi.string().required().valid('teacher', 'student')
});

module.exports = updateUserSchema;