const router = require('express').Router();
const db = require("../models");

router.post('/task', (req, res, next) => {
  console.log(req.user);
  db.Task.create({
    description: req.body.task,
    UserId: req.user.id
  }).then((task) => res.redirect('/profile')).catch(next);
});

router.get('/profile', (req, res, next) => {
  db.Task.findAll({
    where: {
      UserId: req.user.id
    },
    include: [db.User]
    }).then((task) => res.json(task)).catch(next);
});

module.exports = router;
