const express = require("express");
const router = express.Router();
const {
  validatePassword,
  checkPassword,
} = require("../middlewares/userMiddleware/userMiddlewares");
const {
  authUserProtect,
} = require("../middlewares/userMiddleware/authUsersMiddleware");

const {
  authAdminProtect,
} = require("../middlewares/adminMiddlewares/authAdminsMiddleware");

const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  userLogin,
  updateUserStatus,
} = require("../controllers/usersControllers");

router
  .route("/")
  .get(authAdminProtect, getUsers)
  .post(validatePassword, createUser);

router
  .route("/:id")
  .get(authUserProtect, getOneUser)
  .put(checkPassword, validatePassword, authUserProtect, updateUser)
  .delete(authAdminProtect, deleteUser);

router.route("/login").post(userLogin);

router.route("/:id/updatestatus").put(authAdminProtect, updateUserStatus);

module.exports = router;
