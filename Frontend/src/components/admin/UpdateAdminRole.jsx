import React from "react";
import { useState } from "react";
import { RiExchangeFill } from "react-icons/ri";
import FormButton from "../shared/FormButton";

export const UpdateAdminRole = ({ admin, handleUpdating }) => {
  //state for admin's role
  const [adminRole, setAdminRole] = useState(admin.role);

  return (
    <form
      className="flex flex-col justify-center items-center mx-auto"
      onSubmit={(event) =>
        handleUpdating(event, admin._id, admin.role, adminRole)
      }
    >
      <select
        className="my-2 p-2 rounded"
        value={adminRole}
        onChange={(e) => setAdminRole(e.target.value)}
      >
        <option value={"owner"}>owner</option>
        <option value={"admin"}>admin</option>
      </select>
      <FormButton
        text={{ default: "Update Role" }}
        icon={<RiExchangeFill className="mb-[-2px] ml-1" size={25} />}
      />
    </form>
  );
};
