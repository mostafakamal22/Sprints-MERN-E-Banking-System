const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const { generateAdminsToken } = require("../helpers/generateAdminsToken");

//@desc   >>>> Get All Admins
//@route  >>>> GET /api/admins
//@Access >>>> private(Owner Only)
const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("_id email role admin_name");
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> Get one admin
//@route  >>>> GET /api/admin/:id
//@Access >>>> privete(admins Only)
const getOneAdmin = async (req, res) => {
  let admin;
  try {
    admin = await Admin.findById(req.params.id);
    res.status(200).json({
      id: admin.id,
      name: admin.admin_name,
      email: admin.email,
      role: admin.role,
    });
  } catch (error) {
    if (!admin) return res.status(404).send("Admin Not Found!");
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> admin login
//@route  >>>> GET /api/admins/login
//@Access >>>> privete(admins + owner)
const adminLogin = async (req, res) => {
  //check for empty body
  if (!req.body.email || !req.body.password)
    return res.status(404).send("empty body request");
  const { email, password } = req.body;
  let admin;
  try {
    admin = await Admin.findOne({ email });
    //check for password
    const isCorrectPassword = await bcrypt.compare(password, admin.password);
    if (isCorrectPassword) {
      return res.status(200).json({
        id: admin.id,
        name: admin.admin_name,
        email: admin.email,
        role: admin.role,
        token: generateAdminsToken(admin.id, admin.email, admin.role),
      });
    } else {
      return res.status(404).send("Wrong Credintials - wrong password");
    }
  } catch (error) {
    if (!admin || !isCorrectPassword) {
      return res
        .status(404)
        .send("Wrong Credintials - wrong email or password");
    }

    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> Create admin
//@route  >>>> POST /api/admins/
//@Access >>>> privete(Owner Only)
const createAdmin = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const admin = await Admin.create({
      admin_name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });
    res.status(201).json({
      _id: admin.id,
      admin_name: admin.admin_name,
      email: admin.email,
      role: admin.role,
    });
  } catch (error) {
    if (error.message.match(/(email|password|name|role)/gi)) {
      return res.status(400).send(error.message);
    }

    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> UPDATE Admin
//@route  >>>> PUT /api/admins/:id
//@Access >>>> private(all Admin for their accounts)
const updateAdmin = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //get admin
    const admin = await Admin.findById(req.params.id);
    //update user with new values
    admin.email = req.body.email;
    admin.markModified("email");
    admin.password = hashedPassword;
    admin.markModified("password");

    //get updated admin info & send it back
    const updatedAdmin = await admin.save();

    res.status(200).json(updatedAdmin);
  } catch (error) {
    if (error.message.match(/(email|password|name|role)/gi)) {
      return res.status(400).send(error.message);
    }

    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> UPDATE Owner
//@route  >>>> PUT /api/admin/owner/:id
//@Access >>>> private(Owner Only)
const updateOwner = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //get owner
    const owner = await Admin.findById(req.params.id);
    //update owner info
    owner.email = req.body.email;
    owner.markModified("email");
    owner.password = hashedPassword;
    owner.markModified("password");

    //get updated Owner and send it back
    const updatedOwner = await owner.save();

    res.status(200).json(updatedOwner);
  } catch (error) {
    if (error.message.match(/(email|password|name|role)/gi)) {
      return res.status(400).send(error.message);
    }
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> Delete one Admin
//@route  >>>> DELETE /api/admins/:id
//@Access >>>> private(Owner Only)
const deleteAdmin = async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: deletedAdmin.id });
  } catch (error) {
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> Update Admin Role
//@route  >>>> put /api/admins/updaterole/:id
//@Access >>>> private(Owner Only)
const updateAdminRole = async (req, res) => {
  //check if new role is actually the old role
  if (req.body.newRole === req.body.oldRole) {
    return res.status(400).send("Please Specify New Role For That Admin");
  }

  try {
    //get admin wanted to update
    const admin = await Admin.findById(req.params.id);
    //update user with new role
    admin.role = req.body.newRole;
    admin.markModified("role");

    //get updated admin info & send it back
    const updatedAdmin = await admin.save();

    res.status(200).json({
      _id: updatedAdmin.id,
      admin_name: updatedAdmin.admin_name,
      email: updatedAdmin.email,
      role: updatedAdmin.role,
    });
  } catch (error) {
    if (error.message.match(/(email|password|name|role)/gi)) {
      return res.status(400).send(error.message);
    }

    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

module.exports = {
  getAdmins,
  getOneAdmin,
  createAdmin,
  adminLogin,
  updateAdmin,
  updateOwner,
  deleteAdmin,
  updateAdminRole,
};
