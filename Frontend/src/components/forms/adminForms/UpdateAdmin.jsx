import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetAdminAuthStatus,
  updateAdmin,
} from "../../../features/Admin/Auth/adminAuthSlice";
import FormButton from "../../shared/FormButton";
import MessagesContainer from "../../shared/MessagesContainer";

export default function UpdateAdmin() {
  const dispatch = useDispatch();
  const { info, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.adminAuth
  );

  const [formInputs, setFormInputs] = useState({
    email: info.email,
    oldPassword: "",
    password: "",
    repeatedPassword: "",
    msg: "",
  });

  const { email, oldPassword, repeatedPassword, password, msg } = formInputs;

  useEffect(() => {
    if (isError) {
      setFormInputs({ ...formInputs, msg: message });
    }

    if (isSuccess) {
      setFormInputs({
        ...formInputs,
        msg: "Profile Has Been Updated Successfully!",
      });
    }
  }, [isError, message, msg, isSuccess]);

  //seperate clean up for status msg (reset status only on unmount)
  useEffect(() => {
    return () => {
      dispatch(resetAdminAuthStatus());
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //set msg to none first
    setFormInputs({ ...formInputs, msg: "" });
    //check for password match >>> if not matched then show error msg
    if (password !== repeatedPassword) {
      setFormInputs({ ...formInputs, msg: "password does not match" });
      return;
    }

    const adminData = {
      email: email.trim(),
      token: info.token,
      id: info.id,
      password,
      oldPassword,
    };
    dispatch(updateAdmin(adminData));
  };

  return (
    <div className="block p-6 m-10 rounded-lg shadow-lg bg-white max-w-[990px]">
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-6">
          <label
            htmlFor="email"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="login-email"
            defaultValue={email}
            onChange={(e) =>
              setFormInputs({ ...formInputs, email: e.target.value })
            }
            aria-describedby="emailHelp"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group mb-6">
          <label
            htmlFor="oldPassword"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Old Password
            <br />
            <span className="text-blue-700">
              - if you <span className="underline font-bold">DO NOT</span> want
              to change password, just type it for all password field.
            </span>
          </label>
          <input
            type="password"
            name="oldPassword"
            className="form-control block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            defaultValue={oldPassword}
            onChange={(e) =>
              setFormInputs({ ...formInputs, oldPassword: e.target.value })
            }
            placeholder="Enter your old Password"
            required
          />
        </div>

        <div className="form-group mb-6">
          <label
            htmlFor="password"
            className="form-label inline-block mb-2 text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            defaultValue={password}
            onChange={(e) =>
              setFormInputs({ ...formInputs, password: e.target.value })
            }
            placeholder="Enter New Password"
            required
          />
        </div>

        <div className="form-group mb-6">
          <label
            htmlFor="repeatedPassword"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Repeat New Password
          </label>
          <input
            type="password"
            name="repeatedPassword"
            className="form-control block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            defaultValue={repeatedPassword}
            onChange={(e) =>
              setFormInputs({
                ...formInputs,
                repeatedPassword: e.target.value,
              })
            }
            placeholder="Repeat New Password"
            required
          />
        </div>

        {/*Request Status and Errors*/}
        <MessagesContainer msg={msg} isSuccess={isSuccess} />

        {/*form button */}
        <FormButton
          text={{ loading: "Updating", default: "Update" }}
          isLoading={isLoading}
        />
      </form>
    </div>
  );
}
