const authMiddleware = require("../middleware/auth-middleware");
const roleMiddleware = require("../middleware/role-middleware");
const newsController = require("../controllers/news-controller");
const Router = require("express").Router;
const router = new Router();
const multer = require("multer");

const upload = multer();

router.post(
  "/create",
  [authMiddleware, roleMiddleware(["admin"])],
  newsController.createNews
);
router.get("/all", newsController.getAllNews);
router.put("/edit/:id", [authMiddleware, roleMiddleware(["admin"])], newsController.updateNews)
router.put("/delete/:id", [authMiddleware, roleMiddleware(["admin"])], newsController.deleteNews)

module.exports = router;