import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  resetUsersStatus,
  updateUserStatus,
} from "../../state/features/Admin/UsersActions/usersSlice";
import { UseResetStatus } from "../../hooks/UseResetStatus";
import FormButton from "../shared/FormButton";
import { MainSpinner } from "../shared/MainSpinner";
import MessagesContainer from "../shared/MessagesContainer";
import { UpdateUserStatus } from "./UpdateUserStatus";
import { TiDelete } from "react-icons/ti";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
  FcSearch,
} from "react-icons/fc";
import { PaginationTable } from "../helpers/PaginationTable";

const tableHeaderTitles = [
  "User Name",
  "User Email",
  "User Status",
  "No. Of Accounts",
  "Remove User",
  "Update Status",
];

export const UsersListControl = ({ usersList }) => {
  const { info } = useSelector((state) => state.adminAuth);

  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.usersData
  );

  //search query state
  const [searchQuery, setSearchQuery] = useState("");

  //search message state
  const [msg, setMsg] = useState("");

  //filtered users list
  const filteredUsers =
    usersList &&
    usersList.filter((user) => {
      if (
        user.user_name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      ) {
        return user;
      }
    });

  // handle removing user
  const handleRemoving = (e, removedUserID) => {
    e.preventDefault();

    //get admin token
    const token = info.token;

    //payload (admin token + id of the user to remove)
    const userData = {
      id: removedUserID,
      token,
    };

    dispatch(deleteUser(userData));
  };

  // handle updating user status
  const handleUpdating = (e, UpdatedUserID, oldStatus, newStatus) => {
    e.preventDefault();

    //get admin token
    const token = info.token;

    //payload (admin token + id of the user to update + user status changes)
    const userData = {
      id: UpdatedUserID,
      token,
      newStatus,
      oldStatus,
    };

    dispatch(updateUserStatus(userData));
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

  const tableRow = (user, index) => {
    return (
      <tr
        key={user._id}
        className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"} border-b `}
      >
        {/*user Name*/}
        <th
          scope="row"
          className="p-2  text-gray-900 whitespace-nowrap  border-x-2 text-center"
        >
          {user.user_name}
        </th>

        {/*user Email*/}
        <th
          scope="row"
          className="p-2  text-gray-900 whitespace-nowrap underline  border-x-2 text-center"
        >
          {user.email}
        </th>

        {/*User Status*/}
        <th scope="row" className="p-2  text-gray-900  border-x-2 text-center ">
          <span
            className={`flex justify-center items-center w-full p-2  mx-auto rounded
                     shadow ${user.user_status === 0 && "bg-green-100"}
                    ${user.user_status === 1 && "bg-gray-100"}
                    ${user.user_status === 2 && "bg-yellow-100"}`}
          >
            {user.user_status === 0 && (
              <>
                <span>Active</span>
                <FcLowPriority className="ml-1" size={27} />
              </>
            )}

            {user.user_status === 1 && (
              <>
                <span>Unactive</span>
                <FcMediumPriority className="ml-1" size={27} />
              </>
            )}

            {user.user_status === 2 && (
              <>
                <span>Suspended</span>
                <FcHighPriority className="ml-1" size={27} />
              </>
            )}
          </span>
        </th>

        {/*User No. Of Accounts*/}
        <th
          scope="row"
          className="p-2  text-gray-900 whitespace-nowrap  border-x-2 text-center"
        >
          <span
            className="flex justify-center items-center w-3 h-3 p-3 mx-auto
                    text-white rounded-[50%] shadow-sm bg-blue-600"
          >
            {user.no_of_account}
          </span>
        </th>

        {/* Remove User */}
        <th
          scope="row"
          className="p-2 text-gray-900 whitespace-nowrap  border-x-2 text-center"
        >
          <form onSubmit={(event) => handleRemoving(event, user._id)}>
            <FormButton
              text={{ default: "Remove" }}
              bgColor={["bg-red-600", "bg-red-700", "bg-red-800"]}
              icon={<TiDelete className="mb-[-2px]" size={25} />}
            />
          </form>
        </th>

        {/* Update User Status */}
        <th
          scope="row"
          className="p-2  text-gray-900 whitespace-nowrap  border-x-2 text-center"
        >
          <UpdateUserStatus user={user} handleUpdating={handleUpdating} />
        </th>
      </tr>
    );
  };

  //clean up for usersList status (on mount , unmount)
  UseResetStatus(() => {
    dispatch(resetUsersStatus());
  });

  UseResetStatus(() => {
    return () => {
      dispatch(resetUsersStatus());
    };
  });

  return (
    <div className="max-w-5xl w-full overflow-x-auto  p-6 bg-slate-50 rounded shadow-lg shadow-black/30">
      <h3 className="text-2xl my-10 p-3 text-center font-bold bg-blue-200 text-gray-900 border-b-4 border-blue-800 rounded shadow">
        Users List ({filteredUsers && filteredUsers.length})
      </h3>

      {/*search users with name*/}
      {(usersList.length !== 0 || isLoading) && (
        <div className="flex justify-center items-center flex-wrap md:flex-nowrap gap-4 mb-6 p-4 bg-blue-200 rounded-md border-b-4 border-blue-800">
          <label
            htmlFor="searchQuery"
            className="flex items-center w-full md:w-auto text-black font-bold"
          >
            <FcSearch size={40} /> <span>Search Users By Name:-</span>
          </label>

          <input
            type="text"
            name="searchQuery"
            className="block w-full md:w-auto px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-500 rounded transition ease-in-out m-0
          focus:text-gray-700 focus:bg-white focus:border-black focus:shadow-md focus:outline-none"
            placeholder="search user"
            defaultValue={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {/*Request Status and Errors*/}
      {(isError || (isSuccess && message)) && (
        <MessagesContainer msg={msg} isSuccess={isSuccess} isError={isError} />
      )}

      {/*Display Table All Data Needed*/}
      {!isLoading && filteredUsers.length > 0 && (
        <PaginationTable
          tableRow={tableRow}
          tableHeader={tableHeader}
          tableBodyData={filteredUsers}
          rowsPerPage={5}
        />
      )}

      {/* if there is No User Records */}
      {!searchQuery && filteredUsers.length === 0 && !isLoading && (
        <div className="bg-yellow-200 text-gray-800 text-center font-bold my-4 py-4 px-2 border-l-4 border-yellow-600 rounded">
          There No User Records Currently!
        </div>
      )}

      {/* if there is search query no user matches >>> No Search Found*/}
      {searchQuery && filteredUsers.length === 0 && !isLoading && (
        <div className="bg-red-200 text-gray-800 text-center font-bold my-4 py-4 px-2 border-l-4 border-red-600 rounded">
          There No Search Result!
        </div>
      )}

      {/* Show spinner when Loading State is true */}
      {isLoading && <MainSpinner />}
    </div>
  );
};
