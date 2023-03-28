const mongoose = require("mongoose");
const { autoIncrement } = require("mongoose-plugin-autoinc");

//Define Balance Transfered in Schema
const transferedInSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      require: [true, "Please Provide Sending Account Id!"],
    },
    balance_transfered: {
      type: Number,
      require: [true, "Please Provide Transfered Balance!"],
      min: [50, "You Can Not Transfer Balance Less Than 50L.E"],
    },
  },
  {
    timestamps: true,
  }
);

//Define Balance Transfered out Schema
const transferedOutSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      require: [true, "Please Provide Receiving Account Id!"],
    },
    balance_transfered: {
      type: Number,
      require: [true, "Please Provide Transfered Balance!"],
      min: [50, "You Can Not Transfer Balance Less Than 50L.E"],
    },
  },
  {
    timestamps: true,
  }
);

//Define Withdraw Log Schema
const withdrawLogSchema = new mongoose.Schema(
  {
    withdrawed_amount: {
      type: Number,
      require: [true, "Please Provide Withdrawed Balance Amount"],
      min: [100, "You Can Not Withdraw Balance Less Than 100L.E"],
    },
  },
  {
    timestamps: true,
  }
);

//Define Deposit Log Schema
const depositLogSchema = new mongoose.Schema(
  {
    depositted_amount: {
      type: Number,
      require: [true, "Please Provide Depositted Balance Amount"],
      min: [100, "You Can Not Deposit Balance Less Than 100L.E"],
    },
  },
  {
    timestamps: true,
  }
);

//Define Account Schema
const accountSchema = new mongoose.Schema(
  {
    client_id: {
      type: String,
      required: [true, "Please Provide Client Id!"],
    },
    balance: {
      type: Number,
      default: 0,
      min: [0, "Balance Can Not Be Less Than 0 L.E!"],
    },
    in: [transferedInSchema],
    out: [transferedOutSchema],
    deposit_logs: [depositLogSchema],
    withdraw_logs: [withdrawLogSchema],
  },
  {
    timestamps: true,
    collection: "Accounts",
  }
);

//Auto Increament Account ID Plugin
accountSchema.plugin(autoIncrement, {
  model: "Account",
  startAt: 202511545300,
  incrementBy: 1,
});

//Define Account Model
const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
