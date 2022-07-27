const jwt = require("jsonwebtoken");

const User = require("../../models/userModel");

const authUserProtect = async (req, res, next) => {
  let token;
  let user;
  let decoded;
  if (
    req.headers.authorization &&
    req.headers.authorization.trim().startsWith("Bearer")
  ) {
    try {
      //Get Token from header
      token = req.headers.authorization.split(" ")[1];
      //verify token
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      //Get User from Token
      user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).send("Not Authorized with invalid token");
      }
      //pass user object to next middleware
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      if (!decoded || !(await User.findById(decoded.id))) {
        return res.status(401).send("Not Authorized with invalid token");
      }
      return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
  }
  if (!token) return res.status(401).send("Not Authorized without token");
};

module.exports = {
  authUserProtect,
};
