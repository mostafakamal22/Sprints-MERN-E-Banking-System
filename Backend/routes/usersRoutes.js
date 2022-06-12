const express = require("express");
const router = express.Router();
const {
  validatePassword,
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
  .get(getOneUser)
  .put(validatePassword, updateUser)
  .delete(deleteUser);

router.route("/login").post(authUserProtect, userLogin);

module.exports = router;
