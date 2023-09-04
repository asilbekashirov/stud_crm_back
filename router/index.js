const Router = require("express").Router;
const router = new Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.use('/auth', require('./user-routes'))
router.use('/uni', require('./university-routes'))
router.use('/news', require('./news-router'))
router.use('/analytics', require('./analytics-router'))

module.exports = router