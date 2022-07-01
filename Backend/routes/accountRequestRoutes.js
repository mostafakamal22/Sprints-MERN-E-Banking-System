const express = require("express");
const router = express.Router();

const {
  checkPassword,
} = require("../middlewares/userMiddleware/userMiddlewares");

const {
  authUserProtect,
} = require("../middlewares/userMiddleware/authUsersMiddleware");

const {
  authAdminProtect,
} = require("../middlewares/adminMiddlewares/authAdminsMiddleware");

const {
  getAccountRequests,
  createAccountRequest,
  deleteAccountRequest,
} = require("../controllers/accountRequestController");

router.route("/").get(authAdminProtect, getAccountRequests);

router
  .route("/create")
  .post(authUserProtect, checkPassword, createAccountRequest);

router.route("/:id").delete(authAdminProtect, deleteAccountRequest);

module.exports = router;
