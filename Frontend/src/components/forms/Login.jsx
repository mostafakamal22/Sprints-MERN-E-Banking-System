import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, reset } from "../../features/Auth/authSlice";

export default function Login() {
  const [fromInputs, setFromInputs] = useState({
    email: "",
    password: "",
    error: "",
  });

  const { email, password, error } = fromInputs;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      setFromInputs({ ...fromInputs, error: message });
    }

    if (user) {
      console.log("Login Succesfully");
      dispatch(reset());
      navigate("/");
    }
  }, [isError, message, user, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //set error msg to none first
    setFromInputs({ ...fromInputs, error: "" });

    const userData = {
      email: email.trim(),
      password,
    };
    await dispatch(login(userData));
  };

  return (
    <div>
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
                setFromInputs({ ...fromInputs, email: e.target.value })
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
                setFromInputs({ ...fromInputs, password: e.target.value })
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
          <button
            type="submit"
            className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
          >
            Log in
          </button>
          <p className="text-gray-800 mt-6 text-center">
            Not a Client?
            <Link
              to="/register"
              className="mx-2 text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
            >
              Register
            </Link>
          </p>
          <br />
          <div className="text-red-800 text-center">{error}</div>
        </form>
      </div>
    </div>
  );
}
