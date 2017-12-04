const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.render('index', { user: req.user });
});

router.get('/home', (req, res, next) => {
  res.redirect('index');
});

router.get('/about', (req, res, next) => {
  res.render('about', { user: req.user });
});

module.exports = router;
