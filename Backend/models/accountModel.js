const mongoose = require("mongoose");

//Define Balance Transfer in Schema
const transferedInSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      require: [true, "please provide sending id"],
    },
    balance_transfered: {
      type: Number,
      require: [true, "please provide transfer balance"],
      min: [50, "You Can Not Transfer less Than 50LE"],
    },
  },
  {
    timestamps: true,
  }
);

//Define Balance Transfer out Schema
const transferedOutSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      require: [true, "please provide receiving id"],
    },
    balance_transfered: {
      type: Number,
      require: [true, "please provide transfer balance"],
      min: [50, "You Can Not Transfer less Than 50LE"],
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
      required: [true, "please provide client id"],
    },
    balance: {
      type: Number,
      default: 0,
      min: [0, "Blanace Can Not Be less than 0 L.E"],
    },
    in: [transferedInSchema],
    out: [transferedOutSchema],
  },
  {
    timestamps: true,
  }
);

//Define Account Model
const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
