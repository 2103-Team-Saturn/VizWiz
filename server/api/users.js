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

router.get('/ChartHistory', async (req, res, next) => {
  try {
		console.log("userId", req.body.userId)
    if (req.body.userId) {
      const graphs = await Graph.findAll({
        where: {
          userId: req.params.userId
        },
        include: [
          {
            model: Data
          }
        ]
      })
      res.send(graphs)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/ChartHistory/:graphId', async (req, res, next) => {
  try {
    const graph = await Graph.destroy({
      where: {
        id: req.params.graphId
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
