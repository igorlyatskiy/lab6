const uuid = require('uuid').v4;

const db = require('../models');
const logger = require('../common/logger')('UsersRepository');

class UsersRepository {
	constructor() {
		this._users = db.users;
	}

	static instance() {
		return userService;
	}

	async addUser(data) {
		const result = await this._users.create({
			userId: uuid(),
			email: data.email,
			password: data.password,
			phone: data.phone,
			nickname: data.nickname,
			role: data.role,
		});

		return result && result.dataValues;
	}

	async updateUser(data) {
		await this._users.update(
			{
				phone: data.phone,
				nickname: data.nickname,
				role: data.role,
			},
			{ where: { userId: data.userId } }
		);

		return await this.getUser(null, data.userId);
	}

	async deleteUser(userId) {
		return await this._users.destroy({
			where: { userId }
		});
	}

	async getAllUsers() {
		return await this._users.findAll();
	}

	async getUser(email, userId) {
		let result;
		if (email) {
			result = await this._users.findOne({
				where: { email },
			});
		} else if (userId) {
			result = await this._users.findOne({
				where: { userId },
			});
		}

		return result;
	}
}

const userService = new UsersRepository();

module.exports = UsersRepository;