const Account = require("../models/accountModel");

//@desc   >>>> Create Account
//@route  >>>> POST /api/account/create
//@Access >>>> Private (through admin approve only)
const createAccount = async (req, res) => {
  try {
    const account = await Account.create({
      client_id: req.body.id,
      balance: req.body.balance,
    });
    res.status(201).json({ id: account.id });
  } catch (error) {
    if (error.message.match(/(Blanace|id)/gi)) {
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
    if (!user) return res.status(404).send("Account Not Found!");
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
const transfer = async (req, res) => {
  const { balanceTransfered } = req.body;
  try {
    //get sending user account
    const sendingUser = await Account.findById(req.params.from_id);

    //get receiving user account
    const receivingUser = await User.findById(req.params.from_id);

    //update both users' accounts with new tranfer values
    // 1- balance
    sendingUser.balance -= balanceTransfered;
    sendingUser.markModified("balance");
    receivingUser.balance += balanceTransfered;
    receivingUser.markModified("balance");
    // 2- transfer log >> out (sending user)
    sendingUser.out.push({
      to: receivingUser.id,
      balance_transfered: balanceTransfered,
    });
    sendingUser.markModified("out");
    // 2- transfer log >> in (receiving user)
    receivingUser.in.push({
      from: sendingUser.id,
      balance_transfered: balanceTransfered,
    });
    receivingUser.markModified("out");

    //Save Transfer operation for both users' accounts
    const updatedSendingAccount = await sendingUser.save();
    const updatedReceivingAccount = await receivingUser.save();

    res.status(200).json(updatedSendingAccount);
  } catch (error) {
    if (error.message.match(/(transfer|id)/gi))
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
    account.balance += depositAmount;
    account.markModified("balance");

    //Save Deposit operation
    const updatedAccount = await account.save();

    res.status(200).json(updatedAccount);
  } catch (error) {
    if (error.message.match(/(Blanace)/gi))
      return res.status(400).send(error.message);
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> Withdraw Money
//@route  >>>> PUT /api/account/withdraw/:id
//@Access >>>> private(for User only)
const withdraw = async (req, res) => {
  const { withdrawAmount } = req.body;
  try {
    //get account
    const account = await Account.findById(req.params.id);

    //update  user's balance with new deposit value
    account.balance -= withdrawAmount;
    account.markModified("balance");

    //Save Deposit operation
    const updatedAccount = await account.save();

    res.status(200).json(updatedAccount);
  } catch (error) {
    if (error.message.match(/(Blanace)/gi))
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
