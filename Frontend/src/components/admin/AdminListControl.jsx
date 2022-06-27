import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAdmin,
  resetOwnerStatus,
  updateAdminRole,
} from "../../features/Admin/Owener/ownerSlice";
import FormButton from "../shared/FormButton";
import { MainSpinner } from "../shared/MainSpinner";

const AdminListControl = ({ adminsList }) => {
  const { info } = useSelector((state) => state.adminAuth);

  const { isLoading } = useSelector((state) => state.ownerData);

  const dispatch = useDispatch();

  //search query state
  const [searchQuery, setSearchQuery] = useState("");

  //filtered admins list
  const filteredAdmins =
    adminsList &&
    adminsList.filter((admin) => {
      if (
        admin.admin_name
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase())
      ) {
        return admin;
      }
    });

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
      <h3 className="text-lg font-bold text-blue-900 my-5">
        {" "}
        Admins List ({filteredAdmins.length}){" "}
      </h3>

      {/*search admins with name*/}
      <div className="flex justify-center items-center flex-wrap md:flex-nowrap gap-4 mb-6 p-4 bg-blue-400 rounded-md">
        <label
          htmlFor="searchQuery"
          className="block w-full
          md:w-auto text-black
          "
        >
          Search Admin By Name:-
        </label>

        <input
          type="text"
          name="searchQuery"
          className="
          block
          w-full
          md:w-auto
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-500
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-black focus:shadow-md focus:outline-none"
          placeholder="search admin"
          defaultValue={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ul className="flex flex-col justify-center">
        <li className="flex justify-between items-center flex-wrap text-black border p-2">
          <span>Admin Name</span>
          <span>Admin Role</span>
          <span>Remove Admin</span>
          <span>Update Role</span>
        </li>

        {/* Show spinner when Loading State is true */}
        {isLoading && <MainSpinner />}

        {/* if there no search query >>> just display adminsList === filteredAdmins  */}
        {filteredAdmins &&
          !isLoading &&
          filteredAdmins.map((admin) => (
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
                <FormButton text={{ default: "Remove" }} />
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
                <FormButton text={{ default: "Update Role" }} />
              </form>
            </li>
          ))}

        {/* if there is search query no admin matches >>> just display msg  */}

        {searchQuery && filteredAdmins.length === 0 && !isLoading && (
          <li className="bg-red-500 text-white my-4 py-4 px-2 rounded">
            There No Search Result!
          </li>
        )}
      </ul>
    </div>
  );
};

export default AdminListControl;
