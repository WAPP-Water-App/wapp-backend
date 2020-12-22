// MAIN ROUTER
const { validate } = require('./middleware');

// DEPENDENCIES
const router = require('express').Router();

// MIDDLEWARE
router.use('/authorize', require('./auth'));
router.use('/profile', validate, require('./profile'));
router.use('/data', validate, require('./data'));

module.exports = router;
