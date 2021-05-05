const Sequelize = require("sequelize");
const db = require("../db");

const Data = db.define("data", {
	values: {
		type: Sequelize.JSON,
	},
});

module.exports = Data;
