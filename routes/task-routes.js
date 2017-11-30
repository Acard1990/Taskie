const router = require('express').Router();
const db = require("../models");


router.post('/', (req, res) => {
  db.Task.create({
    
  })
});

module.exports = router;
