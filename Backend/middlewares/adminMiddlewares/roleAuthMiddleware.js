//check admin role (Owner or admin)
const checkRole = async (req, res, next) => {
  console.log(req.admin);
  //check for invalid user token
  if (!req.admin.role) {
    return res.status(401).send("Not Authorized for users");
  }
  const { role } = req.admin;
  //owners only allowed to continue...
  if (role === "owner") return next();
  //admins are not allowed
  return res.status(401).send("Not Authorized owner only");
};

module.exports = {
  checkRole,
};
