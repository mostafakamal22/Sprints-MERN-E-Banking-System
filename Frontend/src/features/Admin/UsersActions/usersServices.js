import axios from "axios";

const API_URL = "http://localhost:5000/api/users/";

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

// //Update Admin Role
// const updateAdminRole = async (adminData) => {
//   const res = await axios.put(API_URL + "updaterole/" + adminData.id, {
//     headers: {
//       authorization: `Bearer ${adminData.token}`,
//     },
//   });
//   const data = res.data;

//   return data;
// };

const usersServices = {
  getAllUsers,
  deleteUser,
};

export default usersServices;
