//check user's status (active, unactive, suspended).
//@useCase:- for All requests user wiil make after login.
const checkUserStatus = (req, res, next) => {
  //Get user
  const user = req.user;

  //check for (unactive, suspended) status
  if (user.user_status !== 0) {
    return res
      .status(400)
      .send(
        `Your E-Bank's Account Has Been ${
          user.user_status === 1 ? "Unactive" : "Suspended"
        }!, For more information Contact our Support Team.`
      );
  }
  //Okay User status is active
  //Go to next middleware
  next();
};

module.exports = {
  checkUserStatus,
};
