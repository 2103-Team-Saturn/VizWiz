const router = require('express').Router();
const {
  models: { User, Data },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],
      // include: [{ model: Data }],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//move to data.js
router.get('/:id/data', async (req, res, next) => {
  try {
    const data = await Data.findAll({ where: { userId: req.params.id } });
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/data/:dataId', async (req, res, next) => {
  try {
    const data = await Data.findByPk(req.params.dataId);
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/data', async (req, res, next) => {
  try {
    const data = await Data.create(req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

//app.use
