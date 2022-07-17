const Account = require("../../models/accountModel");

//check account balance is above requested (transfer or withdraw) money
//@usedCase:- when user updating his account balance (tranfer or withdraw)
const checkBalance = async (req, res, next) => {
  let requestedBalance;
  let accountId;

  //check for zero or less balance transfred/withdrawn/deposited
  if (
    req.body.withdrawAmount <= 0 ||
    req.body.balanceTransfered <= 0 ||
    req.body.depositAmount <= 0
  ) {
    return res.status(400).send("Please Provide Balance More than 0");
  }

  //check for empty body request
  if (
    !req.body.withdrawAmount &&
    !req.body.balanceTransfered &&
    !req.body.depositAmount
  ) {
    return res.status(400).send("empty body request");
  }

  //for deposit requests
  if (req.body.depositAmount) {
    //okay deposited balance is > 0
    //procceed to next middleware
    return next();
  }

  //for transfer requests
  if (req.body.balanceTransfered) {
    requestedBalance = req.body.balanceTransfered;
    accountId = req.params.from_id;
  }

  //for withdraw requests
  if (req.body.withdrawAmount) {
    requestedBalance = req.body.withdrawAmount;
    accountId = req.params.id;
  }

  try {
    //get account
    const account = await Account.findById(accountId);

    //compare balance with requested balance
    if (account.balance >= requestedBalance) {
      //okay enough balance to proceed
      return next();
    } else {
      //not enough balance to (transfer or withdraw)
      return res.status(400).send("Balance Not Enough To Make That Proccess!");
    }
  } catch (error) {
    return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

module.exports = {
  checkBalance,
};
