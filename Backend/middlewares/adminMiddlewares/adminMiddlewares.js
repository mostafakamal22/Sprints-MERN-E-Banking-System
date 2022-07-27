const Admin = require("../../models/adminModel");
const bycrpt = require("bcryptjs");

//Validate Password before Hashing it.
//@useCase:- when admin registers/updates an admin account.
const validatePassword = (req, res, next) => {
  //check for empty request first
  if (Object.keys(req.body).length === 0)
    return res.status(400).send("empty body request");

  let regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})"
  );
  /*
      (?=.*[a-z])>>The string must contain at least 1 lowercase alphabetical character
      (?=.*[A-Z])>>The string must contain at least 1 uppercase alphabetical character
      (?=.*[0-9])>>The string must contain at least 1 numeric character
      (?=.*[!@#$%^&*])>>The string must contain at least one special character, 
      but we are escaping reserved RegEx characters to avoid conflict
      (?=.{8,})>>The string must be eight characters or longer */

  //invalid password (weak password)
  if (!regex.test(req.body.password)) {
    return res.status(400).send("Not a Valid Password");
  }

  //okay valid password
  return next();
};

//check password that comes from request is the password that being saved into database
//@useCase:- when admin updating his info
const checkPassword = async (req, res, next) => {
  try {
    //get admin
    const admin = await Admin.findById(req.body.id);
    //compare password
    const isPassword = await bycrpt.compare(
      req.body.oldPassword,
      admin.password
    );

    if (isPassword) {
      //okay right password
      return next();
    } else {
      return res.status(400).send("Wrong old password");
    }
  } catch (error) {
    return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

module.exports = {
  validatePassword,
  checkPassword,
};
