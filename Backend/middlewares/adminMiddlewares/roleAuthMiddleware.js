//check admin role (Owner or admin)
const checkRole = async (req, res, next) => {
  const { role } = req.admin;
  if (role === "owner") return next();
  return res.status(401).json("error: Not Authorized owner only");
};

module.exports = {
  checkRole,
};
