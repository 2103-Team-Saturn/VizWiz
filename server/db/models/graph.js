const Sequelize = require("sequelize");
const db = require("../db");

const Graph = db.define("graph", {
	properties: {
		type: Sequelize.JSON,
	},
});

module.exports = Graph;
