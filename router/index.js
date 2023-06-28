const Router = require("express").Router;
const router = new Router();

router.use('/auth', require('./user-routes'))

module.exports = router