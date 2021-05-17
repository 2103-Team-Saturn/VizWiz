const router = require("express").Router();
const Room = require("../db/models/room");

module.exports = router;

router.post("/", async (req, res, next) => {
	try {
		const room = await Room.create(req.body);
		res.send(room);
	} catch (error) {
		next(error);
	}
});

router.get("/", async (req, res, next) => {
	try {
		const rooms = await Room.findAll();
		res.send(rooms);
	} catch (error) {
		next(error);
	}
});
