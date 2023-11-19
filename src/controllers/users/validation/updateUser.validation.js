const Joi = require('joi');

const updateUserSchema = Joi.object({
	nickname: Joi.string()
		.min(3)
		.max(40),

	phone: Joi.string()
		.min(3)
		.max(15),

	role: Joi.string().required().valid('teacher', 'student'),

	userId: Joi.string()
		.required(),
});

module.exports = updateUserSchema;