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
const {
  sendNotification,
} = require("../middlewares/notificationMiddleware/sendNotificationMiddleware");

router.route("/").get(authAdminProtect, getAccountRequests);

router
  .route("/create")
  .post(authUserProtect, checkPassword, createAccountRequest, sendNotification);

router
  .route("/:id")
  .delete(authAdminProtect, deleteAccountRequest, sendNotification);

module.exports = router;
