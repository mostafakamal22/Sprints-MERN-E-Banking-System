import React from "react";

export const UsersListControl = ({ usersList }) => {
  const { info } = useSelector((state) => state.adminAuth);

  //   const { isLoading } = useSelector((state) => state.UsersData);

  const dispatch = useDispatch();

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

    // dispatch(deleteUser(userData));
  };

  // handle updating user status
  const handleUpdating = (e, UpdatedUserID) => {
    e.preventDefault();

    //get admin token
    const token = info.token;

    //payload (admin token + id of the user to update)
    const userData = {
      id: UpdatedUserID,
      token,
    };

    // dispatch(updateUserStatus(userData));
  };

  return (
    <div>
      <h3> Users List </h3>

      <ul>
        {usersList.map((user) => (
          <li key={user.id}>
            {/*user Name*/}
            <span> {user.name} </span>

            {/*user Email*/}
            <span> {user.email} </span>

            {/*User Status*/}
            <span> {user.user_status} </span>

            {/*User No. Of Accounts*/}
            <span> {user.no_of_accounts} </span>

            {/* Remove User */}
            <form onSubmit={(event) => handleRemoving(event, user.id)}>
              <FormButton
                text={{ loading: "Removing", default: "Remove" }}
                isLoading={isLoading}
              />
            </form>

            {/* Update User Status */}
            <form onSubmit={(event) => handleUpdating(event, user.id)}>
              <option>
                <select defaultChecked={user.user_status === 0}>active</select>
                <select defaultChecked={user.user_status === 1}>
                  unactive
                </select>
                <select defaultChecked={user.user_status === 2}>
                  suspended
                </select>
              </option>
              <FormButton
                text={{ loading: "Updating", default: "Update Status" }}
                isLoading={isLoading}
              />
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};
