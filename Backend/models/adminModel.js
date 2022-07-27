const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    admin_name: {
      type: String,
      required: [true, "Please Type your Name!"],
      validate: {
        validator: function (v) {
          let regex = new RegExp(
            "^(?=[a-zA-Z0-9._ ]{10,35}$)(?!.*[_.]{2})[^_.].*[^_.]$"
            /*  no >>> _ or . at the beginning
              no >>>__ or _. or ._ or .. inside 
              no >>> _ or . at the end
              [a-zA-Z0-9._] >> allowed characters
              username is {10-} characters long
              */
          );
          return regex.test(v);
        },
        message: "Please Enter A Valid Name!",
      },
    },
    email: {
      type: String,
      required: [true, "Please Type An Email!"],
      unique: true,
      validate: {
        validator: function (v) {
          let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
          return regex.test(v);
        },
        message: "Please Enter A Valid Email!",
      },
    },
    password: {
      type: String,
      required: [true, "Please Type A Strong Password!"],
    },
    role: {
      type: String,
      required: [true, "Please Set The Admin Role!"],
      enum: {
        values: ["admin", "owner"],
        message: "{VALUE} is not supported as a Role",
      },
    },
  },
  {
    timestamps: true,
    collection: "Admins",
  }
);

//handle duplicate 'Key' error when 'SAVING' an Admin
adminSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    let dupKeys = Object.keys(error.keyPattern);
    next(new Error(`This ${dupKeys} is Already Used By Another Admin!`));
  } else {
    next();
  }
});

//handle duplicate 'Key' error when 'UPDATING' an Admin
adminSchema.post("updateOne", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    let dupKeys = Object.keys(error.keyPattern);
    next(new Error(`This ${dupKeys} is Already Used By Another Admin!`));
  } else {
    next();
  }
});

//Define Admin Model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
