import axios from "axios";

const API_URL = "http://localhost:5000/api/users/";

//Get User
const getUser = async (userData) => {
  const res = await axios.get(API_URL + userData.id, {
    headers: {
      authorization: `Bearer ${userData.token}`,
    },
  });

  const data = res.data;

  return data;
};

//UPDATE User
const updateUser = async (userData) => {
  const res = await axios.put(API_URL + userData.id, userData, {
    headers: {
      authorization: `Bearer ${userData.token}`,
    },
  });

  const data = res.data;

  return data;
};

//User Logout
const userLogout = () => {
  return;
};

const userServices = {
  getUser,
  updateUser,
  userLogout,
};

export default userServices;
