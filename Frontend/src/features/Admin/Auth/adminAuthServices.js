import axios from "axios";

const API_URL = "http://localhost:5000/api/admins/";

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

//Register Admin
const adminRegister = async (adminData) => {
  const res = await axios.post(API_URL, adminData, {
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

const adminAuthServices = {
  adminRegister,
  adminLogin,
  adminLogout,
};

export default adminAuthServices;
