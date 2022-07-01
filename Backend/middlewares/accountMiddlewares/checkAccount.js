const Account = require("../../models/accountModel");

//check account is exist or not
//@usedCase:- when user transfer money to another account
const checkAccount = async (req, res, next) => {
  let account;

  try {
    //get account
    account = await Account.findById(req.params.to_id);

    //check for account being exist.
    if (account) {
      //okay valid account to proceed
      return next();
    }
  } catch (error) {
    if (!account) {
      return res.status(400).send("Account Not Found!");
    }
    return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

module.exports = {
  checkAccount,
};
