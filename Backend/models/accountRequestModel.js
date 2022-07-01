const mongoose = require("mongoose");

//Define Account request Schema
const AccountRequestSchema = new mongoose.Schema(
  {
    client_id: {
      type: String,
      require: [true, "please provide client id"],
    },
    initial_balance: {
      type: Number,
      require: [true, "please provide initial balance"],
      min: [0, "Initial Balance Can Not less Than 0LE"],
    },
  },
  {
    timestamps: true,
  }
);

//Define Account Request Model
const AccountRequest = mongoose.model("AccountRequest", AccountRequestSchema);

module.exports = AccountRequest;
