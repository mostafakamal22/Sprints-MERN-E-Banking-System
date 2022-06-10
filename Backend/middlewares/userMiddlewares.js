//Validate Password before Hashing it, store it in the data base

const validatePassword = (req, res, next) => {
  let regex = new RegExp();
  if (regex.test(req.body.password)) return next();
  next(
    res.status(400).json({ error: "Password validation: Not a Valid Password" })
  );
};

module.exports = {
  validatePassword,
};
