import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://e-bank-mern-app.herokuapp.com/api/admins/"
    : "http://localhost:5000/api/admins/";

//Login Admin
const adminLogin = async (adminData) => {
  const res = await axios.post(API_URL + "login", adminData, {
    headers: {
      "content-type": "application/json",
    },
  });
  const data = res.data;

  return data;
};

//Logout
const adminLogout = () => {
  return;
};

//Get Admin
const getAdmin = async (adminData) => {
  const res = await axios.get(API_URL + adminData.id, {
    headers: {
      authorization: `Bearer ${adminData.token}`,
    },
  });
  const data = res.data;

  return data;
};

//Update Admin
const updateAdmin = async (adminData) => {
  const res = await axios.put(API_URL + adminData.id, adminData, {
    headers: {
      authorization: `Bearer ${adminData.token}`,
    },
  });
  const data = res.data;

  return data;
};

const adminAuthServices = {
  adminLogin,
  adminLogout,
  getAdmin,
  updateAdmin,
};

export default adminAuthServices;
