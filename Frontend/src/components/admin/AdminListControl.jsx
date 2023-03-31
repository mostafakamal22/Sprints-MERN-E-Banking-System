import React, { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAdmin,
  resetOwnerStatus,
  updateAdminRole,
} from "../../state/features/Admin/Owner/ownerSlice";
import { UseResetStatus } from "../../hooks/UseResetStatus";
import FormButton from "../shared/FormButton";
import { MainSpinner } from "../shared/MainSpinner";
import MessagesContainer from "../shared/MessagesContainer";
import { FcBusinessman, FcPodiumWithSpeaker, FcSearch } from "react-icons/fc";
import { UpdateAdminRole } from "./UpdateAdminRole";
import { PaginationTable } from "../helpers/PaginationTable";

const tableHeaderTitles = [
  "Admin Name",
  "Admin Role",
  "Remove Admin",
  "Update Role",
];

const AdminListControl = ({ adminsList }) => {
  const { info } = useSelector((state) => state.adminAuth);

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ownerData
  );

  const dispatch = useDispatch();

  //search query state
  const [searchQuery, setSearchQuery] = useState("");

  //search message state
  const [msg, setMsg] = useState("");

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
  const handleUpdating = (e, UpdatedAdminID, oldRole, newRole) => {
    e.preventDefault();

    //get owner token
    const token = info.token;

    //payload (owner token + id of the admin to update + role change)
    const adminData = {
      id: UpdatedAdminID,
      newRole,
      oldRole,
      token,
    };

    dispatch(updateAdminRole(adminData));
  };

  useEffect(() => {
    if (isError) {
      setMsg(message);
    }

    if (isSuccess && message) {
      setMsg(message);
    }
  }, [isError, message, isSuccess, msg]);

  //Define table data
  const tableHeader = (
    <tr>
      {tableHeaderTitles.map((title) => (
        <th
          key={title}
          scope="col"
          className="py-3 px-3 text-center border-x-2"
        >
          {title}
        </th>
      ))}
    </tr>
  );

  const tableRow = (admin, index) => {
    return (
      <tr
        key={admin._id}
        className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"} border-b `}
      >
        {/*Admin Name*/}
        <th
          scope="row"
          className="p-2 text-gray-900 whitespace-nowrap  border-x-2 text-center"
        >
          {admin.admin_name}
        </th>

        {/*Admin Role*/}
        <th
          scope="row"
          className="p-2 text-gray-900 whitespace-nowrap  border-x-2 text-center"
        >
          <span
            className={`flex justify-center items-center w-full p-2  mx-auto rounded ${
              admin.role === "owner" ? "bg-green-200" : "bg-blue-200"
            }`}
          >
            <span>{admin.role}</span>
            {admin.role === "owner" && (
              <FcPodiumWithSpeaker className="ml-1" size={27} />
            )}
            {admin.role === "admin" && (
              <FcBusinessman className="ml-1" size={27} />
            )}
          </span>
        </th>

        {/* Remove Admin */}
        <th
          scope="row"
          className="p-2 text-gray-900 whitespace-nowrap  border-x-2 text-center"
        >
          <form onSubmit={(event) => handleRemoving(event, admin._id)}>
            <FormButton
              text={{ default: "Remove" }}
              bgColor={["bg-red-600", "bg-red-700", "bg-red-800"]}
              icon={<TiDelete className="mb-[-2px]" size={25} />}
            />
          </form>
        </th>

        {/* Update Admin Role */}
        <th
          scope="row"
          className="p-2 text-gray-900 whitespace-nowrap  border-x-2 text-center"
        >
          <UpdateAdminRole admin={admin} handleUpdating={handleUpdating} />
        </th>
      </tr>
    );
  };

  //clean up for adminList status (on mount , unmount)
  UseResetStatus(() => {
    dispatch(resetOwnerStatus());
  });

  UseResetStatus(() => {
    return () => {
      dispatch(resetOwnerStatus());
    };
  });

  return (
    <div className="max-w-5xl w-full">
      <h3 className="text-2xl my-10 p-3 text-center font-bold bg-blue-200 text-gray-900 border-b-4 border-blue-800 rounded shadow">
        Admins List ({filteredAdmins && filteredAdmins.length})
      </h3>

      {/*search admins with name*/}
      <div className="flex justify-center items-center flex-wrap md:flex-nowrap gap-4 mb-6 p-4 bg-blue-200 rounded-md border-b-4 border-blue-800">
        <label
          htmlFor="searchQuery"
          className="flex items-center w-full md:w-auto text-black text-base font-semibold"
        >
          <FcSearch size={40} /> <span>Search Admin By Name:-</span>
        </label>

        <input
          type="text"
          name="searchQuery"
          className=" block w-full md:w-auto px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-500 rounded transition ease-in-out m-0
          focus:text-gray-700 focus:bg-white focus:border-black focus:shadow-md focus:outline-none"
          placeholder="search admin"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/*Request Status and Errors*/}
      {(isError || isSuccess) && msg && (
        <MessagesContainer msg={msg} isSuccess={isSuccess} isError={isError} />
      )}

      {/*Display Table All Data Needed*/}
      {!isLoading && filteredAdmins.length > 0 && (
        <PaginationTable
          tableRow={tableRow}
          tableHeader={tableHeader}
          tableBodyData={filteredAdmins}
          rowsPerPage={20}
        />
      )}

      {/*if there is search query no admin matches >>> No Search Found!*/}
      {searchQuery && filteredAdmins.length === 0 && !isLoading && (
        <div className="bg-red-200 text-gray-800 text-center font-bold my-4 py-4 px-2 border-l-4 border-red-600 rounded">
          There No Search Result!
        </div>
      )}

      {/* Show spinner when Loading State is true */}
      {isLoading && <MainSpinner />}
    </div>
  );
};

export default AdminListControl;
