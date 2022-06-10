const mongoose = require("mongoose");

//Define Balance Transfer Schema
const transferedInSchema = new mongoose.Schema(
  {
    from: Number,
    balance_transfered: {
      type: Number,
      min: [50, "You Can Not Transfer less Than 50LE"],
    },
  },
  {
    timestamps: true,
  }
);

//Define Balance Transfer Schema
const transferedOutSchema = new mongoose.Schema(
  {
    to: Number,
    balance_transfered: {
      type: Number,
      min: [50, "You Can Not Transfer less Than 50LE"],
    },
  },
  {
    timestamps: true,
  }
);

//Define Account Schema
const accountsSchema = new mongoose.Schema(
  {
    balance: {
      type: Number,
      default: 0,
      min: [0, "Blanace Can Not Be less than 0"],
    },
    in: [transferedInSchema],
    out: [transferedOutSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = {
  accountsSchema,
};
