const { Router } = require("express");
const router = Router();
const userController = require("../controllers/UserController");

router.get("/", userController.findAll);
router.post("/", userController.create);
router.get("/:id", userController.findByID);
router.put("/:id", userController.update);
router.delete("/:id", userController.destroy);

module.exports = router;