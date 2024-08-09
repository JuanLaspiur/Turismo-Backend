const router = require('express').Router();

const userRoute = require('./user.routes');
const destinoRoute = require('./destino.routes');
const tabloideRoute = require('./tabloide.routes');
const referenceRoute = require('./reference.routes');
const commentRoute = require('./comment.routes');
const companyRoute = require('./company.routes');
const company_serviceRoute = require('./company_service.routes')

router.use('/users', userRoute);
router.use('/destinos', destinoRoute);
router.use('/tabloides', tabloideRoute);
router.use('/references', referenceRoute);
router.use('/comments', commentRoute);
router.use('/companies', companyRoute);
router.use('/company_services', company_serviceRoute);


module.exports = router;