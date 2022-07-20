const Account = require("../models/accountModel");

//@desc   >>>> Create Account
//@route  >>>> POST /api/account/create
//@Access >>>> Private (through admin approve only)
const createAccount = async (req, res, next) => {
  try {
    const account = await Account.create({
      client_id: req.body.id,
      balance: req.body.balance,
    });
    //go to notification
    req.approved = {
      request_id: req.body.request_id,
      client_id: account.client_id,
      account_id: account.id,
    };
    next();
  } catch (error) {
    if (error.message.match(/(Balance|Account|id)/gi)) {
      return res.status(400).send(error.message);
    }
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> Get account
//@route  >>>> GET /api/account/:id
//@Access >>>> private(User)
const getAccount = async (req, res) => {
  let account;
  try {
    account = await Account.findById(req.params.id);
    res.status(200).json(account);
  } catch (error) {
    if (!account) return res.status(404).send("Account Not Found!");
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> Delete Account
//@route  >>>> DELETE /api/account/:id
//@Access >>>> private(for user only)
const deleteAccount = async (req, res) => {
  try {
    const deletedAccount = await Account.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: deletedAccount.id });
  } catch (error) {
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> Transfer Money
//@route  >>>> PUT /api/account/transfer/:from_id/:to_id
//@Access >>>> private(for User only)
const transfer = async (req, res, next) => {
  const { balanceTransfered } = req.body;
  try {
    //get sending user account
    const sendingAccount = await Account.findById(req.params.from_id);

    //get receiving user account
    const receivingAccount = await Account.findById(req.params.to_id);

    //update both users' accounts with new tranfer values
    // 1- balance
    sendingAccount.balance -= +balanceTransfered;
    sendingAccount.markModified("balance");
    receivingAccount.balance += +balanceTransfered;
    receivingAccount.markModified("balance");
    // 2- transfer log >> out (sending user)
    sendingAccount.out.push({
      to: receivingAccount.id,
      balance_transfered: balanceTransfered,
    });
    sendingAccount.markModified("out");
    // 2- transfer log >> in (receiving user)
    receivingAccount.in.push({
      from: sendingAccount.id,
      balance_transfered: balanceTransfered,
    });
    receivingAccount.markModified("in");
    //Save Transfer operation for both users' accounts
    const updatedSendingAccount = await sendingAccount.save();
    const updatedReceivingAccount = await receivingAccount.save();
    //go to notification
    req.transfered = {
      updatedSendingAccount,
      updatedReceivingAccount,
      balanceTransfered,
    };
    next();
  } catch (error) {
    if (error.message.match(/(transfer|id|Balance|Account)/gi))
      return res.status(400).send(error.message);
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> Deposit Money
//@route  >>>> PUT /api/account/deposit/:id
//@Access >>>> private(for User only)
const deposit = async (req, res) => {
  //check for empty body request
  if (!req.body.depositAmount) {
    return res.status(400).send("empty body request");
  }
  const { depositAmount } = req.body;
  try {
    //get account
    const account = await Account.findById(req.params.id);

    //update  user's balance with new deposit value
    account.balance += +depositAmount;
    account.markModified("balance");

    //update user's withdraw logs with new deposit log
    account.deposit_logs.push({
      depositted_amount: +depositAmount,
    });
    account.markModified("deposit_logs");

    //Save Deposit operation
    const updatedAccount = await account.save();

    res.status(200).json(updatedAccount);
  } catch (error) {
    if (error.message.match(/(Balance|Account)/gi))
      return res.status(400).send(error.message);
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> Withdraw Money
//@route  >>>> PUT /api/account/withdraw/:id
//@Access >>>> private(for User only)
const withdraw = async (req, res) => {
  //check for empty body request
  if (!req.body.withdrawAmount) {
    return res.status(400).send("empty body request");
  }
  const { withdrawAmount } = req.body;
  try {
    //get account
    const account = await Account.findById(req.params.id);

    //update user's balance with new withdrawl value
    account.balance -= +withdrawAmount;
    account.markModified("balance");

    //update user's withdraw logs with new withdrawl log
    account.withdraw_logs.push({
      withdrawed_amount: +withdrawAmount,
    });
    account.markModified("withdraw_logs");

    //Save Deposit operation
    const updatedAccount = await account.save();

    res.status(200).json(updatedAccount);
  } catch (error) {
    if (error.message.match(/(Balance|Account)/gi))
      return res.status(400).send(error.message);
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

module.exports = {
  createAccount,
  deleteAccount,
  getAccount,
  transfer,
  deposit,
  withdraw,
};
