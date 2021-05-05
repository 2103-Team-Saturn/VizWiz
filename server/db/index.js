//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Graph = require("./models/Graph");
const Data = require("./models/data");

//associations could go here!
User.hasMany(Graph);
Graph.belongsTo(User);

User.hasMany(Data);
Data.belongsTo(User);

Data.hasMany(Graph);
Graph.belongsTo(Data);

module.exports = {
	db,
	models: {
		User,
		Graph,
		Data,
	},
};
