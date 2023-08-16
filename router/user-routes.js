const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth-middleware");
const router = new Router();

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/add-university", userController.addUniversity)
router.delete("/remove-university", userController.removeUniversity)
router.get("/activate/:link", userController.activate);
router.get("/users", authMiddleware, userController.getUsers);
router.put("/user/:id/update", authMiddleware, userController.updateUser)
router.delete("/user/:id/delete", authMiddleware, userController.deleteUser)

module.exports = router;
