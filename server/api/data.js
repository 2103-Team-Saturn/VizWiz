const router = require('express').Router();
const {
  models: { Data },
} = require('../db');
module.exports = router;

// GET users/:id/data/:dataId
router.get('/:dataId', async (req, res, next) => {
  try {
    console.log('dataId param', req.params.dataId);
    const data = await Data.findByPk(req.params.dataId);
    res.send(data);
  } catch (error) {
    next(error);
  }
});

// POST users/:id/data // WORKING
router.post('/', async (req, res, next) => {
  try {
    console.log('post reqparams>>>', req.params);
    const data = await Data.create(req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});
