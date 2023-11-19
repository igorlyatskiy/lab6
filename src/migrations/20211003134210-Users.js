'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('users', {
			userId: {
				type: Sequelize.STRING,
				primaryKey: true,
				allowNull: false
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false
			},
			nickname: {
				type: Sequelize.STRING,
				allowNull: true
			},
			phone: {
				type: Sequelize.STRING,
				allowNull: true
			},
			role: {
				type: Sequelize.STRING,
				allowNull: false
			}
		}, {
			timestamps: false
		});
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('users');
	}
};
