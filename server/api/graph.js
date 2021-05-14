// const router = require("express").Router();
// const {
// 	models: { Graph, Data },
// } = require("../db");
// module.exports = router;


// router.post('/:id/data/:dataId', async (req, res, next) => {
//   try {
//     const graph = await Graph.create({
//       userId: req.user.id,
//       properties: req.body,
//       datumId: req.params.dataId
//     })
//     const allData = await Graph.findAll({
//       where: {
//         id: graph.id
//       },
//       include: [
//         {
//           model: Data
//         }
//       ]
//     })
//     res.send(allData[0])
//   } catch (err) {
//     next(err)
//   }
// })

// router.get('/ChartHistory', async (req, res, next) => {
//   try {
//     if (req.user.id) {
//       const graphs = await Graph.findAll({
//         where: {
//           userId: req.user.id
//         },
//         include: [
//           {
//             model: Data
//           }
//         ]
//       })
//       res.send(graphs)
//     } else {
//       res.sendStatus(404)
//     }
//   } catch (err) {
//     next(err)
//   }
// })

// router.delete('/ChartHistory/:graphId', async (req, res, next) => {
//   try {
//     const graph = await Graph.destroy({
//       where: {
//         id: req.params.graphId
//       }
//     })
//     res.sendStatus(202)
//   } catch (error) {
//     next(error)
//   }
// })
