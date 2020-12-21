// MAIN ROUTER


// DEPENDENCIES
const router = require('express').Router();

// MIDDLEWARE
router.use('/authorize', require('./auth'));
router.use('/profile', require('./profile'))
router.use('/data', require('./data'))

module.exports = router;