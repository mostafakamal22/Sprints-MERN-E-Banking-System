const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateUsersToken } = require("../helpers/generateUsersToken");

//@desc   >>>> Get All Users
//@route  >>>> GET /api/users
//@Access >>>> private(admins)
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select(
      "_id user_name email user_status no_of_account"
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> Get one User
//@route  >>>> GET /api/users/:id
//@Access >>>> private(User)
const getOneUser = async (req, res) => {
  let user;
  try {
    user = await User.findById(req.params.id);
    res.status(200).json({
      name: user.user_name,
      email: user.email,
      address: user.full_addresse,
      id: user.id,
      accountsCount: user.no_of_account,
      createdAt: user.createdAt,
      userStatus: user.user_status,
      postal: user.zip_code,
      phone: user.phone,
    });
  } catch (error) {
    if (!user) return res.status(404).send("user Not Found!");
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> Create one User
//@route  >>>> POST /api/users/:id
//@Access >>>> public
const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      user_name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      full_addresse: req.body.addresse,
      zip_code: req.body.postal,
    });
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateUsersToken(user.id, user.email),
    });
  } catch (error) {
    if (error.message.match(/(email|password|name|postal|phone|addresee)/gi)) {
      return res.status(400).send(error.message);
    }
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> user login
//@route  >>>> GET /api/users/login
//@Access >>>> privete(user only)
const userLogin = async (req, res) => {
  //check for empty body
  if (!req.body.email || !req.body.password)
    return res.status(404).send("empty body request");
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email });
    //ckeck for password
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (isCorrectPassword) {
      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateUsersToken(user.id, user.email),
      });
    } else {
      return res.status(404).send("Wrong Credintials - wrong password");
    }
  } catch (error) {
    if (!user || !isCorrectPassword)
      return res
        .status(404)
        .send("Wrong Credintials - wrong email or password");
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> UPDATE User
//@route  >>>> PUT /api/users/:id
//@Access >>>> private(for User only)
const updateUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //get user
    const user = await User.findById(req.params.id);
    //update user with new values
    user.email = req.body.email;
    user.markModified("email");
    user.password = hashedPassword;
    user.markModified("password");
    user.phone = req.body.phone;
    user.markModified("phone");
    user.full_addresse = req.body.addresse;
    user.markModified("full_addresse");
    user.zip_code = req.body.postal;
    user.markModified("zip_code");

    //get updated user info & send it back
    const updatedUser = await user.save();

    res.status(200).json({
      name: updatedUser.user_name,
      email: updatedUser.email,
      address: updatedUser.full_addresse,
      id: updatedUser.id,
      accountsCount: updatedUser.no_of_account,
      createdAt: updatedUser.createdAt,
      userStatus: updatedUser.user_status,
      postal: updatedUser.zip_code,
      phone: updatedUser.phone,
    });
  } catch (error) {
    if (error.message.match(/(email|password|name|postal|phone|addresee)/gi))
      return res.status(400).send(error.message);
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> Delete one User
//@route  >>>> DELETE /api/users/:id
//@Access >>>> private(for admins only)
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: deletedUser.id });
  } catch (error) {
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> Update User's Status
//@route  >>>> put /api/users/:id/updatestatus
//@Access >>>> private(for admins only)
const updateUserStatus = async (req, res) => {
  try {
    //get user
    const user = await User.findById(req.params.id);
    //update user with new Status
    user.user_status = req.body.newStatus;
    user.markModified("user_status");

    //get updated user info & send it back
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser.id,
      user_name: updatedUser.user_name,
      email: updatedUser.email,
      no_of_account: updatedUser.no_of_account,
      user_status: updatedUser.user_status,
    });
  } catch (error) {
    if (error.message.match(/(email|password|name|postal|phone|addresee)/gi))
      return res.status(400).send(error.message);
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  userLogin,
  updateUser,
  deleteUser,
  updateUserStatus,
};
