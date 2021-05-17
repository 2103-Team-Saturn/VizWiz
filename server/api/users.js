const router = require('express').Router();
const {
	models: { User, Data, Graph },
} = require("../db");
module.exports = router;

router.use('/:id/data', require('./data'));


router.get("/", async (req, res, next) => {
	try {
		const users = await User.findAll({
			// explicitly select only the id and username fields - even though
			// users' passwords are encrypted, it won't help if we just
			// send everything to anyone who asks!
			attributes: ["id", "username"],
			include: [ { model: Data } ]
		});
		res.json(users);
	} catch (err) {
		next(err);
	}
});

router.get('/:id/data', async (req, res, next) => {
  try {
    const data = await Data.findAll({ where: { userId: req.params.id } });
    res.send(data);
  } catch (error) {
    next(error);
  }
});


router.post('/:id/data/:dataId', async (req, res, next) => {
  try {
    const graph = await Graph.create({
      userId: req.params.id,
      properties: req.body,
      datumId: req.params.dataId
    })
    const allData = await Graph.findAll({
      where: {
        id: graph.id
      },
      include: [
        {
          model: Data
        }
      ]
    })
    res.send(allData[0])
  } catch (err) {
    next(err)
  }
})

router.get('/:id/history', async (req, res, next) => {
  try {
		console.log("userId", req.params)
      const graphs = await Graph.findAll({
        where: {
          userId: req.params.id
        },
      })
      res.send(graphs)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id/history', async (req, res, next) => {
  try {
		console.log("body", req.body)
    const graph = await Graph.destroy({
      where: {
        id: req.body.id
      }
    })
    res.sendStatus(202)
  } catch (error) {
    next(error)
  }
})


// router.get("/:id/data/:dataId", async (req, res, next) => {
// 	try {
// 		const data = await Data.findByPk(req.params.dataId);
// 		res.send(data);
// 	} catch (error) {
// 		next(error);
// 	}
// });

// router.post("/:id/data", async (req, res, next) => {
// 	try {
// 		const data = await Data.create(req.body);
// 		res.json(data);
// 	} catch (error) {
// 		next(error);
// 	}
// });
