import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://e-bank-mern-app.herokuapp.com/api/admins/"
    : "http://localhost:5000/api/admins/";

//Register Admin
const adminRegister = async (payload) => {
  const res = await axios.post(API_URL, payload, {
    headers: {
      authorization: `Bearer ${payload.token}`,
    },
  });

  const data = res.data;

  return data;
};

//Get All Admins
const getAllAdmins = async (adminData) => {
  const res = await axios.get(API_URL, {
    headers: {
      authorization: `Bearer ${adminData.token}`,
    },
  });
  const data = res.data;

  return data;
};

//Delete Admin
const deleteAdmin = async (adminData) => {
  const res = await axios.delete(API_URL + adminData.id, {
    headers: {
      authorization: `Bearer ${adminData.token}`,
    },
  });
  const data = res.data;

  return data;
};

//Update Admin Role
const updateAdminRole = async (adminData) => {
  const res = await axios.put(
    API_URL + "updaterole/" + adminData.id,
    adminData,
    {
      headers: {
        authorization: `Bearer ${adminData.token}`,
      },
    }
  );
  const data = res.data;

  return data;
};

//Logout
const ownerLogout = () => {
  return;
};

const ownerServices = {
  getAllAdmins,
  deleteAdmin,
  updateAdminRole,
  adminRegister,
  ownerLogout,
};

export default ownerServices;
