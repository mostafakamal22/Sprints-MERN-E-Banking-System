import React from "react";
import { useState, useEffect } from "react";
import { FcPrivacy } from "react-icons/fc";
import { RiLoginCircleFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  adminLogin,
  resetAdminAuthStatus,
} from "../../../features/Admin/Auth/adminAuthSlice";
import { UseResetStatus } from "../../../hooks/UseResetStatus";
import FormButton from "../../shared/FormButton";
import MessagesContainer from "../../shared/MessagesContainer";

export default function AdminLogin() {
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
    msg: "",
  });

  const { email, password, msg } = formInputs;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { info, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.adminAuth
  );

  useEffect(() => {
    if (isError) {
      setFormInputs({ ...formInputs, msg: message });
    }

    if (info) {
      setFormInputs({ ...formInputs, msg: "Login Succesfully" });
      navigate("/");
    }
  }, [isError, message, info, msg]);

  //clean up  status (on unmount)
  UseResetStatus(() => {
    return () => {
      dispatch(resetAdminAuthStatus());
    };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    //set msg to none first
    setFormInputs({ ...formInputs, msg: "" });

    const adminData = {
      email: email.trim(),
      password,
    };
    dispatch(adminLogin(adminData));
  };

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md mx-auto">
      <h2 className="flex justify-center items-center text-xl font-bold text-center px-2 py-4 my-4 rounded shadow bg-gray-200 border-b-2 border-blue-600">
        <span>Admins Login</span>
        <FcPrivacy className="ml-1" size={45} />
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="w-full inline-block mb-4 p-2 text-gray-800 border-b-2 border-blue-600 rounded shadow bg-blue-200"
          >
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            defaultValue={email}
            onChange={(e) =>
              setFormInputs({ ...formInputs, email: e.target.value })
            }
            placeholder="Enter your Email"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="w-full inline-block mb-4 p-2 text-gray-800 border-b-2 border-blue-600 rounded shadow bg-blue-200"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            defaultValue={password}
            onChange={(e) =>
              setFormInputs({ ...formInputs, password: e.target.value })
            }
            placeholder="Enter Your Password"
            required
          />
        </div>
        <div className="flex justify-end items-center mb-6">
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
          >
            Forgot password?
          </a>
        </div>

        {/*Request Status and Errors*/}
        {(isError || isSuccess) && (
          <MessagesContainer
            msg={msg}
            isSuccess={isSuccess}
            isError={isError}
          />
        )}

        {/*form button */}
        <FormButton
          text={{ loading: "Processing", default: "Login" }}
          isLoading={isLoading}
          icon={<RiLoginCircleFill className="mb-[-2px] ml-1" size={27} />}
        />
      </form>
    </div>
  );
}
