const AccountRequest = require("../models/accountRequestModel");

//@desc   >>>> Create Account Request
//@route  >>>> POST /api/request/create
//@Access >>>> Private (user only)
const createAccountRequest = async (req, res, next) => {
  try {
    const accountRequest = await AccountRequest.create({
      client_id: req.body.id,
      initial_balance: req.body.balance,
    });
    //go to notification with data
    req.created = { account_id: accountRequest.id };
    next();
  } catch (error) {
    console.log(error);
    if (error.message.match(/(Blanace|id)/gi)) {
      return res.status(400).send(error.message);
    }
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> Get All Account Requests
//@route  >>>> GET /api/request
//@Access >>>> private(admins)
const getAccountRequests = async (req, res) => {
  try {
    const accountRequests = await AccountRequest.find();
    res.status(200).json(accountRequests);
  } catch (error) {
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> Delete Account Request
//@route  >>>> DELETE /api/request/:id
//@Access >>>> private(for admins only)
const deleteAccountRequest = async (req, res, next) => {
  try {
    const deletedAccountRequest = await AccountRequest.findByIdAndDelete(
      req.params.id
    );
    //return back initial balance to user
    req.declined = {
      deleted_request_id: deletedAccountRequest.id,
      client_id: deletedAccountRequest.client_id,
      initial_balance: deletedAccountRequest.initial_balance,
    };
    //go to notification
    next();
  } catch (error) {
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

module.exports = {
  createAccountRequest,
  deleteAccountRequest,
  getAccountRequests,
};
