const router = require('express').Router();
const courseRoutes = require('./api/channnlRoutes');
const studentRoutes = require('./api/userRoutes');

router.use('/channels', courseRoutes);
router.use('/users', studentRoutes);

module.exports = router;
