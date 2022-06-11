const express = require("express");

const router = express.Router();

const { validatePassword } = require("../middlewares/userMiddlewares");

const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  userLogin,
} = require("../controllers/usersControllers");
const { authUserProtect } = require("../middlewares/authUsersMiddleware");

router.route("/").get(getUsers).post(validatePassword, createUser);

router
  .route("/:id")
  .get(getOneUser)
  .put(validatePassword, updateUser)
  .delete(deleteUser);

router.route("/login").post(authUserProtect, userLogin);
module.exports = router;
