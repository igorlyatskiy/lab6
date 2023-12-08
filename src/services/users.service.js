const logger = require('../common/logger')('UsersService');
const ServiceError = require('../common/errors/ServiceError');
const UsersRepository = require('../repositories/users.repository').instance();

class UsersService {
	static instance() {
		return userService;
	}

	async createUser(dataToCreate) {
		const existingUser = await UsersRepository.getUser(dataToCreate.email);
		if (existingUser) {
			throw new ServiceError(409, 'User Already Exists.');
		}

		return UsersRepository.addUser(dataToCreate);
	}

	async updateUser(dataToUpdate) {
		const updatedUser = await UsersRepository.updateUser(dataToUpdate);
		if (!updatedUser) {
			throw new ServiceError(500, 'Unknown error');
		}

		return {
			userId: updatedUser.userId,
			email: updatedUser.email,
			nickname: updatedUser.nickname,
			phone: updatedUser.phone,
			role: updatedUser.role,
		};
	}

	async deleteUser(userId) {
		const user = await UsersRepository.getUser(null, userId);

		if (!user) {
			throw new ServiceError(404, 'User does not exist');
		}

		const deleteResult = await UsersRepository.deleteUser(userId);
		if (!deleteResult) {
			throw new ServiceError(500, 'Can not delete user');
		}

		return  {
			userId: user.userId,
			email: user.email,
			nickname: user.nickname,
			phone: user.phone,
			role: user.role,
		};
	}

	async getUser(userId) {
		const user = await UsersRepository.getUser(null, userId);

		if (!user) {
			throw new ServiceError(404, 'User does not exist');
		}

		return {
			userId: user.userId,
			email: user.email,
			nickname: user.nickname,
			phone: user.phone,
			role: user.role
		};
	}

	async getAllUsers() {
		const allUsers = await UsersRepository.getAllUsers();

		const publicUsersData = allUsers.map((user) => {
			return {
				userId: user.userId,
				email: user.email,
				nickname: user.nickname,
				phone: user.phone,
				role: user.role,
			};
		});

		if (!publicUsersData) {
			throw new ServiceError(404, 'Users not found');
		}

		return publicUsersData;
	}
}

const userService = new UsersService();

module.exports = UsersService;