const Router = require("express").Router;
const universityController = require("../controllers/university-controller");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth-middleware");
const roleMiddleware = require("../middleware/role-middleware");
const router = new Router();
const multer = require("multer");
const storage = require('../utils/file-extension')


const upload = multer({storage})

router.post(
  "/create",
  [upload.single("image"), authMiddleware, roleMiddleware(["admin"])],
//   body("nameEn").notEmpty(),
  universityController.createUniversity
);
router.get("/get/:id", universityController.findUniversityById)
router.get("/list", universityController.getUniversities);
router.put("/:id/update", [authMiddleware, roleMiddleware(["admin"])], universityController.updateUniversity)
router.delete("/:id/delete", [authMiddleware, roleMiddleware(["admin"])], universityController.deleteUniversity)

module.exports = router;
