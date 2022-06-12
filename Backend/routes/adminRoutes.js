const express = require("express");

const router = express.Router();

const {
  validatePassword,
} = require("../middlewares/adminMiddlewares/adminMiddlewares");

const {
  authAdminProtect,
} = require("../middlewares/adminMiddlewares/authAdminsMiddleware");

const {
  checkRole,
} = require("../middlewares/adminMiddlewares/roleAuthMiddleware");

const {
  getAdmins,
  getOneAdmin,
  createAdmin,
  updateAdmin,
  updateOwner,
  deleteAdmin,
  adminLogin,
} = require("../controllers/adminsControllers");

router
  .route("/")
  .get(authAdminProtect, checkRole, getAdmins)
  .post(validatePassword, createAdmin);

router
  .route("/:id")
  .get(getOneAdmin)
  .put(validatePassword, updateAdmin)
  .delete(deleteAdmin);

router.route("/owner/:id").put(validatePassword, updateOwner);

router.route("/login").post(authAdminProtect, adminLogin);

module.exports = router;
