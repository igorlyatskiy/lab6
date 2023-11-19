module.exports = (sequelize, Sequelize) => {
	return sequelize.define('users', {
		userId: {
			type: Sequelize.STRING,
			primaryKey: true,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
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
		},
	}, {
		timestamps: false
	});
};