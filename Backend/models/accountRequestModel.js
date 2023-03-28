const mongoose = require("mongoose");
const { autoIncrement } = require("mongoose-plugin-autoinc");

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
      min: [500, "Initial Balance Can Not less Than 500L.E"],
    },
  },
  {
    timestamps: true,
    collection: "AccountRequests",
  }
);

//Auto Increament AccountRequest ID Plugin
AccountRequestSchema.plugin(autoIncrement, {
  model: "AccountRequest",
  startAt: 202311500300,
  incrementBy: 1,
});

//Define Account Request Model
const AccountRequest = mongoose.model("AccountRequest", AccountRequestSchema);

module.exports = AccountRequest;
