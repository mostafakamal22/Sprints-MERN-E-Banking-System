import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAdmin,
  resetOwnerStatus,
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

  //clean up adminList status
  useEffect(() => {
    return () => {
      dispatch(resetOwnerStatus());
    };
  }, []);

  return (
    <div className="bg-white p-5">
      <h3 className="text-lg font-bold text-blue-900 my-5"> Admins List </h3>

      <ul className="flex flex-col justify-center">
        <li className="flex justify-between items-center flex-wrap text-black border p-2">
          <span>Admin Name</span>
          <span>Admin Role</span>
          <span>Remove Admin</span>
          <span>Update Role</span>
        </li>

        {adminsList.map((admin) => (
          <li
            key={admin._id}
            className="flex justify-between items-center flex-wrap border p-2"
          >
            {/*Admin Role*/}
            <span> {admin.admin_name} </span>

            {/*Admin Role*/}
            <span> {admin.role} </span>

            {/* Remove Admin */}
            <form onSubmit={(event) => handleRemoving(event, admin._id)}>
              <FormButton
                text={{ loading: "Removing", default: "Remove" }}
                isLoading={isLoading}
              />
            </form>

            {/* Update Admin Role */}
            <form
              className="flex flex-col justify-center items-center"
              onSubmit={(event) => handleUpdating(event, admin._id)}
            >
              <select className="my-2 p-2 rounded" defaultValue={admin.role}>
                <option defaultValue={"owner"}>owner</option>
                <option defaultValue={"admin"}>admin</option>
              </select>
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
