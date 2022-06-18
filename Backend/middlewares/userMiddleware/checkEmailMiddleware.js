const { email } = req.user;
const { password } = req.body;
//check if email that comes from token is the email from request
if (email !== req.body.email)
  return res.status(404).send("Wrong Credintials - invalid email");
