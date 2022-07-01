const AccountRequest = require("../models/accountRequestModel");

//@desc   >>>> Create Account Request
//@route  >>>> POST /api/request/create
//@Access >>>> Private (user only)
const createAccountRequest = async (req, res) => {
  try {
    const accountRequest = await AccountRequest.create({
      client_id: req.body.id,
      initial_balance: req.body.balance,
    });
    res.status(201).json({ id: accountRequest.id });
  } catch (error) {
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
const deleteAccountRequest = async (req, res) => {
  try {
    const deletedAccountRequest = await AccountRequest.findByIdAndDelete(
      req.params.id
    );
    //return back initial balance to user
    res
      .status(200)
      .json({ initial_balance: deletedAccountRequest.initial_balance });
  } catch (error) {
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

module.exports = {
  createAccountRequest,
  deleteAccountRequest,
  getAccountRequests,
};
