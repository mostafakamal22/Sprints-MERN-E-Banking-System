const express = require("express");
const router = express.Router();

const {
  checkPassword,
} = require("../middlewares/userMiddleware/userMiddlewares");

const {
  authUserProtect,
} = require("../middlewares/userMiddleware/authUsersMiddleware");
const {
  createAccount,
  getAccount,
  deleteAccount,
  transfer,
  deposit,
  withdraw,
} = require("../controllers/accountController");
const {
  checkAccount,
} = require("../middlewares/accountMiddlewares/checkAccount");
const {
  checkBalance,
} = require("../middlewares/accountMiddlewares/checkBalance");

router.route("/create").post(authUserProtect, checkPassword, createAccount);

router
  .route("/:id")
  .get(authUserProtect, getAccount)
  .delete(authUserProtect, checkPassword, deleteAccount);

router
  .route("/transfer/:from_id/:to_id")
  .put(authUserProtect, checkPassword, checkAccount, checkBalance, transfer);

router.route("/deposit/:id").put(authUserProtect, checkPassword, deposit);

router
  .route("/withdraw/:id")
  .put(authUserProtect, checkPassword, checkBalance, withdraw);

module.exports = router;
