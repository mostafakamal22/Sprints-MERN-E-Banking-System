const AccountRequest = require("../../models/accountRequestModel");

//check user already send an account request or not.
//@useCase:- when user trying to make another account request and he has an account request being evaluated already.
const checkExistingAccountRequest = async (req, res, next) => {
  //first get user id from req
  const userId = req.user.id;

  let accountRequest;

  try {
    //get account request
    accountRequest = await AccountRequest.find({ client_id: userId });

    //check for user already has account request being exist.
    if (accountRequest.length > 0) {
      return res
        .status(400)
        .send(
          "Sorry, you Already Has Sent An Account Request!, Please Wait For Our Response Soon."
        );
    }

    //user has no account request before.
    if (accountRequest.length === 0) {
      //okay valid user request.
      return next();
    }
  } catch (error) {
    return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

module.exports = {
  checkExistingAccountRequest,
};
