import axios from "axios";

const API_URL = "http://localhost:5000/api/admins/";

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

const ownerServices = {
  getAllAdmins,
  deleteAdmin,
  updateAdminRole,
};

export default ownerServices;
