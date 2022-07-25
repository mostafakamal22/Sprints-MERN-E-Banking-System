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
const {
  checkBalance,
} = require("../middlewares/accountMiddlewares/checkBalance");
const {
  checkUserStatus,
} = require("../middlewares/userMiddleware/checkUserStatus");
const {
  checkExistingAccountRequest,
} = require("../middlewares/accountRequestMiddlewares/CheckExistingAccountRequest");

router.route("/").get(authAdminProtect, getAccountRequests);

router
  .route("/create")
  .post(
    authUserProtect,
    checkUserStatus,
    checkPassword,
    checkBalance,
    checkExistingAccountRequest,
    createAccountRequest,
    sendNotification
  );

router
  .route("/:id")
  .delete(authAdminProtect, deleteAccountRequest, sendNotification);

module.exports = router;
