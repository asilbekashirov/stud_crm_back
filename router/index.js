const Router = require("express").Router;
const router = new Router();

router.use('/auth', require('./user-routes'))
router.use('/uni', require('./university-routes'))
router.use('/news', require('./news-router'))
router.use('/analytics', require('./analytics-router'))

module.exports = router