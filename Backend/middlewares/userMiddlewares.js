//Validate Password before Hashing it

const validatePassword = (req, res, next) => {
  //check for empty request first
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({ error: "empty body request" });

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
  if (regex.test(req.body.password)) return next();

  return res
    .status(400)
    .json({ error: "Password validation: Not a Valid Password" });
};

module.exports = {
  validatePassword,
};
