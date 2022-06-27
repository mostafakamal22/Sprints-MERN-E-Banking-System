import React from "react";
import { useState } from "react";
import FormButton from "../shared/FormButton";

export const UpdateUserStatus = ({ user, handleUpdating }) => {
  //state for user's status
  const [userStatus, setUserStatus] = useState(user.user_status);

  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={(event) => handleUpdating(event, user._id, userStatus)}
    >
      <select
        className="my-2 p-2 rounded"
        defaultValue={
          userStatus === 0
            ? "active"
            : userStatus === 1
            ? "unactive"
            : "suspended"
        }
        onChange={(e) => {
          const numValue =
            e.target.value === "active"
              ? 0
              : e.target.value === "unactive"
              ? 1
              : 2;
          setUserStatus(numValue);
        }}
      >
        <option defaultValue={"active"}>active</option>
        <option defaultValue={"unactive"}>unactive</option>
        <option defaultValue={"suspended"}>suspended</option>
      </select>
      <FormButton text={{ default: "Update Status" }} />
    </form>
  );
};
