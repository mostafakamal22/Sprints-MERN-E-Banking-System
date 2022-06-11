const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

//@desc   >>>> Get All Users
//@route  >>>> GET /api/users
//@Access >>>> private
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ooops!! Something Went Wrong, Try again..." });
  }
};

//@desc   >>>> Get one User
//@route  >>>> GET /api/users/:id
//@Access >>>> public(Admin + User)
const getOneUser = async (req, res) => {
  let user;
  try {
    user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    if (!user) return res.status(404).json({ error: "Not Found!" });
    res
      .status(500)
      .json({ error: "Ooops!! Something Went Wrong, Try again..." });
  }
};

//@desc   >>>> Create one User
//@route  >>>> POST /api/users/:id
//@Access >>>> private
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
    res.status(201).json({ user: user });
  } catch (error) {
    if (error.message.match(/(email|password|name|postal|phone|addresee)/gi))
      return res.status(400).json({ error: error.message });
    res
      .status(500)
      .json({ error: "Ooops!! Something Went Wrong, Try again..." });
  }
};

//@desc   >>>> UPDATE User
//@route  >>>> PUT /api/users/:id
//@Access >>>> private(for User only)
const updateUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const updatedUser = await User.updateOne(
      { id: req.params.id },
      {
        user_name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        full_addresse: req.body.addresse,
        zip_code: req.body.postal,
      }
    );
    res.status(200).json({ message: "updated seccessfully", updatedUser });
  } catch (error) {
    if (error.message.match(/(email|password|name|postal|phone|addresee)/gi))
      return res.status(400).json({ error: error.message });
    res
      .status(500)
      .json({ error: "Ooops!! Something Went Wrong, Try again..." });
  }
};

//@desc   >>>> Delete one User
//@route  >>>> DELETE /api/users/:id
//@Access >>>> private(for admins only)
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deleted seccessfully", deletedUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ooops!! Something Went Wrong, Try again..." });
  }
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
