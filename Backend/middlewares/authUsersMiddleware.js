const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

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
      //check if email that comes from token is the email from request
      if (user.email !== req.body.email)
        return res.status(404).json({ error: "Wrong Credintials" });
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      if (!decoded || !(await User.findById(decoded.id)))
        return res.status(401).json("error: Not Authorized with invalid token");
      return res
        .status(500)
        .json({ error: "Ooops!! Something Went Wrong, Try again..." });
    }
  }
  if (!token)
    return res.status(401).json("error: Not Authorized without token");
};

module.exports = {
  authUserProtect,
};
