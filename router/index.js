const Router = require("express").Router;
const router = new Router();

router.use('/auth', require('./user-routes'))
router.use('/uni', require('./university-routes'))

module.exports = router