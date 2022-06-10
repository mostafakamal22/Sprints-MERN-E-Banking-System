const express = require("express");

const router = express.Router();

const { validatePassword } = require("../middlewares/userMiddlewares");

const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersControllers");

router.route("/").get(getUsers).post(validatePassword, createUser);

router.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser);

module.exports = router;
