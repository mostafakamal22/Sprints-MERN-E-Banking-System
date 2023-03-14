import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://ebank-2t3r.onrender.com/api/users/"
    : "http://localhost:5000/api/users/";

//Get All Users
const getAllUsers = async (adminData) => {
  const res = await axios.get(API_URL, {
    headers: {
      authorization: `Bearer ${adminData.token}`,
    },
  });
  const data = res.data;

  return data;
};

//Delete User
const deleteUser = async (payload) => {
  const res = await axios.delete(API_URL + payload.id, {
    headers: {
      authorization: `Bearer ${payload.token}`,
    },
  });
  const data = res.data;

  return data;
};

//Update User Role
const updateUserStatus = async (payload) => {
  const res = await axios.put(
    API_URL + payload.id + "/updatestatus/",
    payload,
    {
      headers: {
        authorization: `Bearer ${payload.token}`,
      },
    }
  );
  const data = res.data;

  return data;
};

//Logout
const adminsLogout = () => {
  return;
};

const usersServices = {
  getAllUsers,
  deleteUser,
  updateUserStatus,
  adminsLogout,
};

export default usersServices;
