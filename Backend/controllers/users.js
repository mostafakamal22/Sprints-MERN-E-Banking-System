//@desc   >>>> Get All Users
//@route  >>>> GET /api/users
//@Access >>>> private
const getUsers = (req, res) => {
  res.status(200).json({ message: "Get All Users" });
};

//@desc   >>>> Get one User
//@route  >>>> GET /api/users/:id
//@Access >>>> private
const getOneUser = (req, res) => {
  res.status(200).json({ message: `Get User ${req.params.id}` });
};

//@desc   >>>> Create one User
//@route  >>>> POST /api/users/:id
//@Access >>>> private
const createUser = (req, res) => {
  res.status(201).json({ message: `Craete New User` });
};

//@desc   >>>> UPDATE User
//@route  >>>> PUT /api/users/:id
//@Access >>>> Public
const updateUser = (req, res) => {
  res.status(200).json({ message: `Update User ${req.params.id}` });
};

//@desc   >>>> Delete one User
//@route  >>>> DELETE /api/users/:id
//@Access >>>> private
const deleteUser = (req, res) => {
  res.status(200).json({ message: `Delete User ${req.params.id}` });
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
