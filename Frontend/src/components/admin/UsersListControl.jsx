import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  resetUsersStatus,
  updateUserStatus,
} from "../../features/Admin/UsersActions/usersSlice";
import FormButton from "../shared/FormButton";
import { MainSpinner } from "../shared/MainSpinner";
import MessagesContainer from "../shared/MessagesContainer";
import { UpdateUserStatus } from "./UpdateUserStatus";

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
  const handleUpdating = (e, UpdatedUserID, newStatus) => {
    e.preventDefault();

    //get admin token
    const token = info.token;

    //payload (admin token + id of the user to update)
    const userData = {
      id: UpdatedUserID,
      token,
      newStatus,
    };

    dispatch(updateUserStatus(userData));
  };

  useEffect(() => {
    if (isError) {
      setMsg(message);
    }

    if (isSuccess) {
      setMsg("Success!");
    }
  }, [isError, message, isSuccess, msg]);

  //clean up usersList status
  useEffect(() => {
    return () => {
      dispatch(resetUsersStatus());
    };
  }, []);

  return (
    <div className="bg-white p-5">
      <h3 className="text-lg font-bold text-blue-900 my-5">
        {" "}
        Users List ({filteredUsers.length}){" "}
      </h3>

      {/*search users with name*/}
      <div className="flex justify-center items-center flex-wrap md:flex-nowrap gap-4 mb-6 p-4 bg-blue-400 rounded-md">
        <label
          htmlFor="searchQuery"
          className="block w-full
          md:w-auto text-black
          "
        >
          Search Users By Name:-
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

      {/*Request Status and Errors*/}
      {(isError || isSuccess) && (
        <MessagesContainer msg={msg} isSuccess={isSuccess} isError={isError} />
      )}

      <ul className="flex flex-col justify-center">
        <li className="flex justify-between items-center flex-wrap text-black border p-2">
          <span>User Name</span>
          <span>User Email</span>
          <span>User Status</span>
          <span>No. Of Accounts</span>
          <span>Remove User</span>
          <span>Update Status</span>
        </li>

        {/* Show spinner when Loading State is true */}
        {isLoading && <MainSpinner />}

        {/* if there no search query >>> just display adminsList which == filteredAdmins */}
        {filteredUsers &&
          !isLoading &&
          filteredUsers.map((user) => (
            <li
              key={user._id}
              className="flex justify-between items-center flex-wrap border p-1"
            >
              {/*user Name*/}
              <span> {user.user_name} </span>

              {/*user Email*/}
              <span className="underline"> {user.email} </span>

              {/*User Status*/}
              <span
                className={`
                  text-white p-1 rounded ${
                    user.user_status === 0 && "bg-green-600"
                  }
                  ${user.user_status === 1 && "bg-gray-600"}
                  ${user.user_status === 2 && "bg-yellow-600"}
                `}
              >
                {user.user_status === 0 && "active"}
                {user.user_status === 1 && "unactive"}
                {user.user_status === 2 && "suspended"}
              </span>

              {/*User No. Of Accounts*/}
              <span className="flex justify-center items-center w-[30px] h-[30px] rounded-full bg-blue-600 text-white ">
                {" "}
                {user.no_of_account}{" "}
              </span>

              {/* Remove User */}
              <form onSubmit={(event) => handleRemoving(event, user._id)}>
                <FormButton text={{ default: "Remove" }} />
              </form>

              {/* Update User Status */}
              <UpdateUserStatus user={user} handleUpdating={handleUpdating} />
            </li>
          ))}

        {/* if there is search query no user matches >>> just display msg  */}
        {searchQuery && filteredUsers.length === 0 && !isLoading && (
          <li className="bg-red-500 text-white my-4 py-4 px-2 rounded">
            There No Search Result!
          </li>
        )}
      </ul>
    </div>
  );
};
