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
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  userLogin,
} = require("../controllers/usersControllers");

router.route("/").get(getUsers).post(validatePassword, createUser);

router
  .route("/:id")
  .get(authUserProtect, getOneUser)
  .put(checkPassword, validatePassword, authUserProtect, updateUser)
  .delete(deleteUser);

router.route("/login").post(userLogin);

module.exports = router;
