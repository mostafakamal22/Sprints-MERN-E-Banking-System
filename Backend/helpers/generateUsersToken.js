const jwt = require("jsonwebtoken");

const generateUsersToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET);
};

module.exports = {
  generateUsersToken,
};
