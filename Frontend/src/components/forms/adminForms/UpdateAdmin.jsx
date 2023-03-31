import React, { useState } from "react";
import { useEffect } from "react";
import { AiFillSlackCircle } from "react-icons/ai";
import { FcDoughnutChart, FcInfo } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {
  resetAdminAuthStatus,
  updateAdmin,
} from "../../../state/features/Admin/Auth/adminAuthSlice";
import FormButton from "../../shared/FormButton";
import MessagesContainer from "../../shared/MessagesContainer";
import { InputsValidator } from "../helpers/InputsValidator";

export default function UpdateAdmin() {
  const dispatch = useDispatch();
  const { info, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.adminAuth
  );

  const [formInputs, setFormInputs] = useState({
    email: info && info.email,
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
        msg: message,
      });
    }
  }, [isError, message, isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Reset Admin Status
    dispatch(resetAdminAuthStatus());
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

  if (info)
    return (
      <div className="max-w-4xl w-full self-start">
        <h3 className="flex justify-center items-center text-2xl italic font-bold text-center px-2 py-4 mb-10 rounded shadow bg-blue-200 border-b-4 border-blue-800">
          <FcDoughnutChart className="ml-1" size={50} />
          <span>Update Your Info</span>
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
              value={email}
              onChange={(e) =>
                setFormInputs({ ...formInputs, email: e.target.value })
              }
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="oldPassword"
              className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
            >
              Old Password
            </label>
            <span className="flex items-center flex-col md:flex-row gap-2 text-sm md:text-base  text-blue-700 mb-2 font-medium">
              <FcInfo size={27} />
              <span>
                If you DO NOT want to change password, just type it for all
                password field.
              </span>
            </span>
            <input
              type="password"
              name="oldPassword"
              id="oldPassword"
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
              value={oldPassword}
              onChange={(e) =>
                setFormInputs({ ...formInputs, oldPassword: e.target.value })
              }
              placeholder="Enter your old Password"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
            >
              New Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
              value={password}
              onChange={(e) =>
                setFormInputs({ ...formInputs, password: e.target.value })
              }
              placeholder="Enter New Password"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="repeatedPassword"
              className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
            >
              Repeat New Password
            </label>
            <input
              type="password"
              name="repeatedPassword"
              id="repeatedPassword"
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
              value={repeatedPassword}
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

          {/* password validator */}
          <InputsValidator passwordInput={password} />

          {/*Request Status and Errors*/}
          {msg && (
            <MessagesContainer
              msg={msg}
              isSuccess={isSuccess ? isSuccess : false}
              isError={isError || (msg && !isSuccess) ? true : false}
            />
          )}

          {/*form button */}
          <FormButton
            text={{ loading: "Updating", default: "Update" }}
            isLoading={isLoading}
            icon={<AiFillSlackCircle className="ml-1" size={25} />}
          />
        </form>
      </div>
    );
}
