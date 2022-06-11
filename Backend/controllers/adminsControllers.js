const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");

//@desc   >>>> Get All Admins
//@route  >>>> GET /api/admins
//@Access >>>> private(Owner Only)
const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ooops!! Something Went Wrong, Try again..." });
  }
};

//@desc   >>>> Get one admin
//@route  >>>> GET /api/admin/:id
//@Access >>>> privete(Owner Only)
const getOneAdmin = async (req, res) => {
  let admin;
  try {
    admin = await Admin.findById(req.params.id);
    res.status(200).json(admin);
  } catch (error) {
    if (!admin) return res.status(404).json({ error: "Not Found!" });
    res
      .status(500)
      .json({ error: "Ooops!! Something Went Wrong, Try again..." });
  }
};

//@desc   >>>> Create admin
//@route  >>>> POST /api/admins/:id
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
    res.status(201).json({ admin: admin });
  } catch (error) {
    if (error.message.match(/(email|password|name|role)/gi))
      return res.status(400).json({ error: error.message });
    res
      .status(500)
      .json({ error: "Ooops!! Something Went Wrong, Try again..." });
  }
};

//@desc   >>>> UPDATE Admin
//@route  >>>> PUT /api/admins/:id
//@Access >>>> private(all Admin for their accounts)
const updateAdmin = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const updatedAdmin = await Admin.updateOne(
      { id: req.params.id },
      {
        $set: {
          admin_name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          role: req.body.role,
        },
      }
    );
    res.status(200).json({ message: "updated seccessfully", updatedAdmin });
  } catch (error) {
    if (error.message.match(/(email|password|name|role)/gi))
      return res.status(400).json({ error: error.message });
    res
      .status(500)
      .json({ error: "Ooops!! Something Went Wrong, Try again..." });
  }
};

//@desc   >>>> UPDATE Owner
//@route  >>>> PUT /api/admin/owner/:id
//@Access >>>> private(Owner Only)
const updateOwner = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const updatedOwner = await Admin.updateOne(
      { id: req.params.id },
      {
        admin_name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
      }
    );
    res.status(200).json({ message: "updated seccessfully", updatedOwner });
  } catch (error) {
    if (error.message.match(/(email|password|name|role)/gi))
      return res.status(400).json({ error: error.message });
    res
      .status(500)
      .json({ error: "Ooops!! Something Went Wrong, Try again..." });
  }
};

//@desc   >>>> Delete one Admin
//@route  >>>> DELETE /api/admins/:id
//@Access >>>> private(Owner Only)
const deleteAdmin = async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deleted seccessfully", deletedAdmin });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ooops!! Something Went Wrong, Try again..." });
  }
};

module.exports = {
  getAdmins,
  getOneAdmin,
  createAdmin,
  updateAdmin,
  updateOwner,
  deleteAdmin,
};
