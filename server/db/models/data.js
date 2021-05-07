const Sequelize = require("sequelize");
const db = require("../db");

const Data = db.define("data", {
	values: {
		type: Sequelize.JSON,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
});

module.exports = Data;
