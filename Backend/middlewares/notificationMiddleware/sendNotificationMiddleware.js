const User = require("../../models/userModel");

//send notification to user {add notification object to user document}
//@useCase:-(1) after user create account request.
//@useCase:-(2) after account (approved or declined) by admin.
//@useCase:-(3) after balance transfer.

const sendNotification = async (req, res) => {
  //case of created account request
  if (req.created) {
    try {
      //create a notification for created request
      const user = await User.findById(req.user.id);
      //add notification to user
      user.notification.push({
        type: "account-request",
        title: "Account Request",
        message: `Your Account Request Has Been Created Successfully!
                    We Will Let Know Whether Been Approved or Not Soon.`,
        data: [
          {
            account_id: created.account_id,
          },
        ],
      });
      user.markModified("notification");

      //save changes
      const updatedUser = await user.save();
      res.status(200).json({
        name: updatedUser.user_name,
        email: updatedUser.email,
        address: updatedUser.full_addresse,
        id: updatedUser.id,
        accountsCount: updatedUser.no_of_account,
        createdAt: updatedUser.createdAt,
        userStatus: updatedUser.user_status,
        postal: updatedUser.zip_code,
        phone: updatedUser.phone,
        accounts: updatedUser.accounts,
        notifications: updatedUser.notification,
      });
    } catch (error) {
      if (error.message.match(/(notification)/gi)) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
  }

  //case of account request has been approved
  if (req.approved) {
    try {
      //create a notification for approved request
      const user = await User.findById(req.user.id);

      //update user (no_of_account + accounts IDS array)
      user.no_of_account += 1;
      user.markModified("no_of_account");
      user.accounts.push(req.approved.account.id);
      user.markModified("accounts");
      //add notification to user
      user.notification.push({
        type: "approved",
        title: "Account Approved!",
        message: `Your Account Request Has Been Approved Successfully!
        you Can Now (Deposit-Withdraw-Transfer) Money any Time you Want.`,
        data: [
          {
            account_id: approved.account_id,
          },
        ],
      });
      user.markModified("notification");

      //save changes
      await user.save();
      res.status(200);
    } catch (error) {
      if (error.message.match(/(notification|Profile)/gi)) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
  }

  //case of account request has been declined
  if (req.declined) {
    try {
      //create a notification for declined request
      const user = await User.findById(req.user.id);
      //add notification to user
      user.notification.push({
        type: "declined",
        title: "Account Declined!",
        message: `We Are Sorry! Your Account Request Has Been Declined!
        If You Want More Details, Please Do Not Hesitate To Contact Us For More Information.`,
        data: [
          {
            initial_balance: declined.initial_balance,
          },
        ],
      });
      user.markModified("notification");

      //save changes
      await user.save();
      res.status(200);
    } catch (error) {
      if (error.message.match(/(notification)/gi)) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
  }

  //case of balance transfer
  if (req.transferd) {
    try {
      //create a notification for transfered balance
      const ReceivingUser = await User.findById(
        req.transfered.updatedReceivingAccount.client_id
      );
      //add notification to user
      ReceivingUser.notification.push({
        type: "transfered-in",
        title: "Received Balance!",
        message: `You Have Received New Balance Successfull!`,
        data: [
          {
            transfered_Amount: req.transfered.balanceTransfered,
            from: req.transfered.updatedSendingAccount.id,
          },
        ],
      });
      ReceivingUser.markModified("notification");

      //save changes
      await ReceivingUser.save();
      res.status(200).json(req.transfered.updatedSendingAccount);
    } catch (error) {
      if (error.message.match(/(notification)/gi)) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
  }
};

module.exports = {
  sendNotification,
};
