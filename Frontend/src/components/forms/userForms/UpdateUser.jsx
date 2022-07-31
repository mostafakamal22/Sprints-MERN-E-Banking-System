import React from "react";
import { useState, useEffect } from "react";
import { AiFillSlackCircle } from "react-icons/ai";
import { FcDoughnutChart, FcInfo } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../state/features/User/UserData/userSlice";
import FormButton from "../../shared/FormButton";
import MessagesContainer from "../../shared/MessagesContainer";
import { InputsValidator } from "../helpers/InputsValidator";

export default function UpdateUser() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);
  const { info, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.userData
  );

  const [fromInputs, setFromInputs] = useState({
    email: info && info.email,
    phone: info && info.phone.toString(),
    postal: info && info.postal.toString(),
    address: info && info.address,
    oldPassword: "",
    password: "",
    repeatedPassword: "",
    msg: "",
  });

  const {
    email,
    oldPassword,
    repeatedPassword,
    password,
    address,
    phone,
    postal,
    msg,
  } = fromInputs;

  useEffect(() => {
    if (isError) {
      setFromInputs({ ...fromInputs, msg: message });
    }

    if (isSuccess) {
      setFromInputs({
        ...fromInputs,
        msg: message,
      });
    }
  }, [isError, message, msg, isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //set msg to none first
    setFromInputs({ ...fromInputs, msg: "" });
    //check for password match >>> if not matched then show error msg
    if (password !== repeatedPassword) {
      setFromInputs({ ...fromInputs, msg: "password does not match" });
      return;
    }

    const userData = {
      email: email.trim(),
      phone: phone.trim(),
      postal: postal.trim(),
      addresse: address.trim(),
      token: user.token,
      id: user.id,
      password,
      oldPassword,
    };
    dispatch(updateUser(userData));
  };

  if (info)
    return (
      <div className="max-w-4xl w-full p-6 bg-slate-50 rounded shadow-lg shadow-black/30">
        <h3 className="flex justify-center items-center text-2xl italic font-bold text-center px-2 py-4 mb-10 rounded shadow bg-blue-200 border-b-4 border-blue-800">
          <FcDoughnutChart className="ml-1" size={50} />
          Update Your Info
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
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              defaultValue={email}
              onChange={(e) =>
                setFromInputs({ ...fromInputs, email: e.target.value })
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
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              defaultValue={oldPassword}
              onChange={(e) =>
                setFromInputs({ ...fromInputs, oldPassword: e.target.value })
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
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              defaultValue={password}
              onChange={(e) =>
                setFromInputs({ ...fromInputs, password: e.target.value })
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
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              defaultValue={repeatedPassword}
              onChange={(e) =>
                setFromInputs({
                  ...fromInputs,
                  repeatedPassword: e.target.value,
                })
              }
              placeholder="Repeat New Password"
              required
            />
          </div>

          {/* password validator */}
          <InputsValidator passwordInput={password} />

          <div className="mb-6">
            <label
              htmlFor="phone"
              className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
            >
              Phone
            </label>
            <input
              type="text"
              name="phone"
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              defaultValue={"0" + phone}
              onChange={(e) =>
                setFromInputs({
                  ...fromInputs,
                  phone: e.target.value,
                })
              }
              placeholder="type your phone number"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="address"
              className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
            >
              Full Address
            </label>
            <input
              type="text"
              name="address"
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              defaultValue={address}
              onChange={(e) =>
                setFromInputs({
                  ...fromInputs,
                  address: e.target.value,
                })
              }
              placeholder="Type your full address"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="postal"
              className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
            >
              Post/Zip Code
            </label>
            <input
              type="text"
              name="postal"
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              defaultValue={postal}
              onChange={(e) =>
                setFromInputs({
                  ...fromInputs,
                  postal: e.target.value,
                })
              }
              placeholder="Type your Post code"
              required
            />
          </div>

          {/*Request Status and Errors*/}
          {(isError || isSuccess) && msg && (
            <MessagesContainer
              msg={msg}
              isSuccess={isSuccess}
              isError={isError}
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
