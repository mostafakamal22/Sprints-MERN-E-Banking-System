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
import { UpdateUserStatus } from "./UpdateUserStatus";

export const UsersListControl = ({ usersList }) => {
  const { info } = useSelector((state) => state.adminAuth);

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.usersData);

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

  //clean up usersList status
  useEffect(() => {
    return () => {
      dispatch(resetUsersStatus());
    };
  }, []);

  return (
    <div className="bg-white p-5">
      <h3 className="text-lg font-bold text-blue-900 my-5"> Users List </h3>

      <ul className="flex flex-col justify-center">
        <li className="flex justify-between items-center flex-wrap text-black border p-2">
          <span>User Name</span>
          <span>User Email</span>
          <span>User Status</span>
          <span>No. Of Accounts</span>
          <span>Remove User</span>
          <span>Update Status</span>
        </li>
        {usersList &&
          usersList.map((user) => (
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
                <FormButton
                  text={{ loading: "Removing", default: "Remove" }}
                  isLoading={isLoading}
                />
              </form>

              {/* Update User Status */}
              <UpdateUserStatus user={user} handleUpdating={handleUpdating} />
            </li>
          ))}
      </ul>
    </div>
  );
};
