import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  adminLogin,
  resetAdminAuthStatus,
} from "../../../features/Admin/Auth/adminAuthSlice";
import FormButton from "../shared/FormButton";
import MessagesContainer from "../shared/MessagesContainer";

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

  //clean up status
  useEffect(() => {
    return () => {
      dispatch(resetAdminAuthStatus());
    };
  }, []);

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
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-6">
          <label
            htmlFor="exampleInputEmail2"
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
            htmlFor="exampleInputPassword2"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Password
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
            id="login-Password"
            defaultValue={password}
            onChange={(e) =>
              setFormInputs({ ...formInputs, password: e.target.value })
            }
            placeholder="Password"
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
        <MessagesContainer msg={msg} isSuccess={isSuccess} />

        {/*form button */}
        <FormButton
          text={{ loading: "Processing", default: "Login" }}
          isLoading={isLoading}
        />
      </form>
    </div>
  );
}
