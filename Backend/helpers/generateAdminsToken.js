const jwt = require("jsonwebtoken");

const generateAdminsToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET);
};

module.exports = {
  generateAdminsToken,
};
