const Sequelize = require("sequelize");
const db = require("../db");

const Graph = db.define("graph", {
	properties: {
		type: Sequelize.JSON,
	},
});

// const Graph = db.define("graph", {
// 	graphSelected: {
// 		type: Sequelize.STRING,
// 		allowNull: false,
// 	},
// 	color: {
// 		type: Sequelize.STRING,
// 		defaultValue: "greyscale",
// 	},
// 	title: {
// 		type: Sequelize.STRING,
// 		allowNull: false,
// 	},
// 	highlight: {
// 		type: Sequelize.STRING,
// 		allowNull: false,
// 	},
// 	tooltip: {
// 		type: Sequelize.INTEGER,
// 		allowNull: false,
// 	},
// 	x: {
// 		type: Sequelize.STRING,
// 		allowNull: false,
// 	},
// 	y: {
// 		type: Sequelize.STRING,
// 		allowNull: false,
// 	},
// 	xVals: {
// 		type: Sequelize.ARRAY,
// 		allowNull: false,
// 	},
// 	yVals: {
// 		type: Sequelize.ARRAY,
// 		allowNull: false,
// 	},
// 	datumId: {
// 		type: Sequelize.INTEGER,
// 		allowNull: false,
// 	}
// });

// -> data= [ { x: xVals[i], y: yVals[i] } ...loops through full lists ]

module.exports = Graph;

// {"graphSelected":"bar","color":"tomato","title":"Test Graph","highlight":"orange","tooltip":"5","x":"x","y":"y","dataId":1}