const analyticsController = require("../controllers/analytics-controller");
const authMiddleware = require("../middleware/auth-middleware");
const roleMiddleware = require("../middleware/role-middleware");
const Router = require("express").Router;
const router = new Router();

router.get(
  "/analyze",
  [authMiddleware, roleMiddleware(["admin"])],
  analyticsController.getAnalytics()
);

module.exports = router;