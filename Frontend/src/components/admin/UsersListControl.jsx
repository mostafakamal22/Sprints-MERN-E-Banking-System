import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  resetUsersStatus,
  updateUserStatus,
} from "../../features/Admin/UsersActions/usersSlice";
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
} from "react-icons/fc";

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
    <div className="max-w-6xl px-5 py-10 mx-4 md:mx-15 bg-white">
      <h3 className="text-lg font-bold text-gray-900 my-5">
        Users List ({filteredUsers && filteredUsers.length})
      </h3>

      {/*search users with name*/}
      <div className="flex justify-center items-center flex-wrap md:flex-nowrap gap-4 mb-6 p-4 bg-blue-200 rounded-md">
        <label
          htmlFor="searchQuery"
          className="block w-full md:w-auto text-black"
        >
          Search Users By Name:-
        </label>

        <input
          type="text"
          name="searchQuery"
          className="block w-full md:w-auto px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-500 rounded transition ease-in-out m-0
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

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full  text-left text-gray-500 border-y-4 border-blue-600 rounded">
          <thead className="text-gray-900 uppercase bg-gray-300">
            <tr>
              <th scope="col" className="py-3 px-6 text-center border-x-2">
                User Name
              </th>
              <th scope="col" className="py-3 px-6 text-center border-x-2">
                User Email
              </th>
              <th scope="col" className="py-3 px-6 text-center border-x-2">
                User Status
              </th>
              <th scope="col" className="py-3 px-6 text-center border-x-2">
                No. Of Accounts
              </th>

              <th scope="col" className="py-3 px-6 text-center border-x-2">
                Remove User
              </th>

              <th scope="col" className="py-3 px-6 text-center border-x-2">
                Update Status
              </th>
            </tr>
          </thead>
          <tbody>
            {/* if there no search query >>> just display usersList === filteredUsers  */}
            {filteredUsers &&
              !isLoading &&
              filteredUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } border-b `}
                >
                  {/*user Name*/}
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap  border-x-2 text-center"
                  >
                    {user.user_name}
                  </th>

                  {/*user Email*/}
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap underline  border-x-2 text-center"
                  >
                    {user.email}
                  </th>

                  {/*User Status*/}
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900  border-x-2 text-center "
                  >
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
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap  border-x-2 text-center"
                  >
                    <span
                      className="flex justify-center items-center w-4 h-4 p-6 mx-auto
                    text-white rounded-[50%] shadow-sm bg-blue-600"
                    >
                      {user.no_of_account}
                    </span>
                  </th>

                  {/* Remove User */}
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap  border-x-2 text-center"
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
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap  border-x-2 text-center"
                  >
                    <UpdateUserStatus
                      user={user}
                      handleUpdating={handleUpdating}
                    />
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Show spinner when Loading State is true */}
      {isLoading && <MainSpinner />}

      {/* if there is search query no user matches >>> just display msg  */}
      {searchQuery && filteredUsers.length === 0 && !isLoading && (
        <div className="bg-red-500 text-white my-4 py-4 px-2 rounded">
          There No Search Result!
        </div>
      )}
    </div>
  );
};
