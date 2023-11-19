const app = require('express');
const joi = require('joi');

const logger = require('../../common/logger')('UsersController');
const ServiceError = require('../../common/errors/ServiceError');
const userService = require('../../services/users.service').instance();
const userValidator = require('./validation/index');

const userRouter = app.Router();

userRouter.get('/', async (req, res) => {
	try {
		const response = await userService.getAllUsers();
		if (!response) {
			res.status(500).send('Internal Server Error');
		}

		return res.send(response);

	} catch (error) {
		if (error instanceof ServiceError) {
			return res.status(error.status).send(error.message);
		}
		logger.error(error);

		return res.status(500).send('Internal Server Error');
	}
});

userRouter.get('/:userId', async (req, res) => {
	try {
		const { userId } = req.params;
		const response = await userService.getUser(userId);

		return res.send(response);

	} catch (error) {
		if (error instanceof ServiceError) {
			return res.status(error.status).send(error.message);
		}
		logger.error(error);

		return res.status(500).send('Internal Server Error');
	}
});

userRouter.post('/', async (req, res) => {
	try {
		const { nickname, phone, email, role } = req.body;

		const dataToCreate = { nickname, phone, email, role };

		try {
			joi.assert(dataToCreate, userValidator.createUserValidation);
		} catch (validationError) {
			return res.status(400).send('Invalid data');
		}

		const response = await userService.createUser(dataToCreate);

		return res.send(response);

	} catch (error) {
		if (error instanceof ServiceError) {
			return res.status(error.status).send(error.message);
		}
		logger.error(error);

		return res.status(500).send('Internal Server Error');
	}
});

userRouter.patch('/:userId', async (req, res) => {
	try {
		const { nickname, phone, role } = req.body;
		const { userId } = req.params;

		const dataToUpdate = { nickname, phone, userId, role };

		try {
			joi.assert(dataToUpdate, userValidator.updateUserValidation);
		} catch (validationError) {
			return res.status(400).send('Invalid data');
		}

		const response = await userService.updateUser(dataToUpdate);

		return res.send(response);

	} catch (error) {
		if (error instanceof ServiceError) {
			return res.status(error.status).send(error.message);
		}
		logger.error(error);

		return res.status(500).send('Internal Server Error');
	}
});

userRouter.delete('/:userId', async (req, res) => {
	try {
		const { userId } = req.params;

		try {
			joi.assert({ userId }, userValidator.deleteUserValidation);
		} catch (validationError) {
			return res.status(400).send('Invalid data');
		}

		const response = await userService.deleteUser(userId);

		return res.send(response);

	} catch (error) {
		if (error instanceof ServiceError) {
			return res.status(error.status).send(error.message);
		}
		logger.error(error);

		return res.status(500).send('Internal Server Error');
	}
});


module.exports = userRouter;
