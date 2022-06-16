import axios from "axios";

const API_URL = "http://localhost:5000/api/users/";

//Login User
const login = async (userData) => {
  const res = await axios.post(API_URL + "login", userData, {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${userData.token}`,
    },
  });

  console.log(res);
  const data = res.data;
  console.log(data);

  if (data.token) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
};

//Register User
const register = async (userData) => {
  const res = await axios.post(API_URL, userData, {
    headers: {
      "content-type": "application/json",
    },
  });

  console.log(res);
  const data = res.data;
  console.log(data);

  if (data.token) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
};

//Logout
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
