const router = require('express').Router();

const userRoute = require('./user.route');
const destinoRoute = require('./destino.route')
const tabloideRoute = require('./tabloide.route')

router.use('/users', userRoute);
router.use('/destinos', destinoRoute);
router.use('/tabloides', tabloideRoute)


module.exports = router;