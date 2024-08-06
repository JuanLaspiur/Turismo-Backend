const router = require('express').Router();

const userRoute = require('./user.route');
const destinoRoute = require('./destino.route')


router.use('/users', userRoute);
router.use('/destinos', destinoRoute);

module.exports = router;