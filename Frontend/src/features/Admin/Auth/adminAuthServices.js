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

//Get Admin
const getAdmin = async (adminData) => {
  const res = await axios.get(API_URL + adminData.id, {
    headers: {
      authorization: `Bearer ${userData.token}`,
    },
  });
  const data = res.data;

  return data;
};

const adminAuthServices = {
  adminRegister,
  adminLogin,
  adminLogout,
  getAdmin,
};

export default adminAuthServices;
