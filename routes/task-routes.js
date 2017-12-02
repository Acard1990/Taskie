const Sequelize = require('sequelize');
const router = require('express').Router();
const db = require("../models");
const Op = Sequelize.Op;


router.post('/task', (req, res, next) => {
  console.log(req.user);
  db.Task.create({
    description: req.body.description,
    details: req.body.details,
    UserId: req.user.id
  }).then((task) => res.redirect('/profile')).catch(next);
});

router.get('/curr_user', (req, res, next) => {
  db.Task.findAll({
    where: {
      UserId: req.user.id
    },
    include: [{
      model: db.User,
      include: db.Ratings
    }, {
      model: db.Assignment,
      include: db.User
    }]
  }).then((task) => res.json(task)).catch(next);
});

router.get('/other/tasks', (req, res, next) => {
  db.Task.findAll({
    where: {
      UserId: {
        [Op.not]: req.user.id
      },
      assigned: false
    },
    limit: 20,
    include: [db.User, {
      model: db.Assignment,
      include: [{
        model: db.User,
        include: [db.Ratings]
      }]
    }]
    }).then((task) => res.json(task)).catch(next);
});

router.get('/curr_user/assignments', (req, res, next) => {
  db.Assignment.findAll({
    where: {
      UserId: req.user.id
    },
    include: [db.Task, {
      model: db.User,
      include: [db.Ratings]
    }]
    }).then((task) => res.json(task)).catch(next);
});

router.post('/grab/task/:taskId', (req, res, next) => {
  db.Assignment.create({
    assigned: true,
    UserId: req.user.id,
    TaskId: req.params.taskId
  }).then(() => db.Task.update({
    assigned: true
    }, {
      where: {
        id: req.params.taskId
      }
  })).catch(next);
});


module.exports = router;
