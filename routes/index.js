const router = require('express').Router();

const userRoute = require('./user.route');
const destinoRoute = require('./destino.route')
const tabloideRoute = require('./tabloide.route')
const referenceRoute = require('./reference.route')

router.use('/users', userRoute);
router.use('/destinos', destinoRoute);
router.use('/tabloides', tabloideRoute)
router.use('/references', referenceRoute)

module.exports = router;