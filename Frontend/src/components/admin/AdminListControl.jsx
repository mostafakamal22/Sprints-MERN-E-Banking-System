import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAdmin,
  updateAdminRole,
} from "../../features/Admin/Owener/ownerSlice";
import FormButton from "../shared/FormButton";

const AdminListControl = ({ adminsList }) => {
  const { info } = useSelector((state) => state.adminAuth);

  const { isLoading } = useSelector((state) => state.ownerData);

  const dispatch = useDispatch();

  // handle removing admin
  const handleRemoving = (e, removedAdminID) => {
    e.preventDefault();

    //get owner token
    const token = info.token;

    //payload (owner token + id of the admin to remove)
    const adminData = {
      id: removedAdminID,
      token,
    };

    dispatch(deleteAdmin(adminData));
  };

  // handle updating admin role
  const handleUpdating = (e, UpdatedAdminID) => {
    e.preventDefault();

    //get owner token
    const token = info.token;

    //payload (owner token + id of the admin to update)
    const adminData = {
      id: UpdatedAdminID,
      token,
    };

    dispatch(updateAdminRole(adminData));
  };

  return (
    <div>
      <h3> Admins List </h3>

      <ul>
        {adminsList.map((admin) => (
          <li key={admin.id}>
            {/*Admin Role*/}
            <span> {admin.admin_name} </span>

            {/*Admin Role*/}
            <span> {admin.role} </span>

            {/* Remove Admin */}
            <form onSubmit={(event) => handleRemoving(event, admin.id)}>
              <FormButton
                text={{ loading: "Removing", default: "Remove" }}
                isLoading={isLoading}
              />
            </form>

            {/* Update Admin Role */}
            <form onSubmit={(event) => handleUpdating(event, admin.id)}>
              <option>
                <select defaultChecked={admin.role === "owner"}>owner</select>
                <select defaultChecked={admin.role === "admin"}>admin</select>
              </option>
              <FormButton
                text={{ loading: "Updating", default: "Update Role" }}
                isLoading={isLoading}
              />
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminListControl;
