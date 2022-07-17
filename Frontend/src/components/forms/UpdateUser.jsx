import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetUserStatus, updateUser } from "../../features/User/userSlice";
import { UseResetStatus } from "../../hooks/UseResetStatus";
import FormButton from "../shared/FormButton";
import MessagesContainer from "../shared/MessagesContainer";

export default function UpdateUser() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);
  const { info, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.userData
  );

  const [fromInputs, setFromInputs] = useState({
    email: info.email,
    phone: info.phone.toString(),
    postal: info.postal.toString(),
    address: info.address,
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
        msg: "Profile Has Been Updated Successfully!",
      });
    }
  }, [isError, message, msg, isSuccess]);

  //clean up for user status msg (on mount , unmount)
  UseResetStatus(() => {
    dispatch(resetUserStatus());
  });

  UseResetStatus(() => {
    return () => {
      dispatch(resetUserStatus());
    };
  });

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

  return (
    <div className="block p-6 m-10 rounded-lg shadow-lg bg-white max-w-3xl">
      <h2 className="text-xl text-center px-2 py-4 my-4 rounded shadow bg-gray-200 border-b-2 border-blue-600">
        Update Your Info
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
            className="w-full inline-block mb-2 p-2 text-gray-800 border-b-2 border-blue-600 rounded shadow bg-blue-200"
          >
            Old Password
          </label>
          <span className="block text-blue-700 mb-2">
            - if you <span className="underline font-bold">DO NOT</span> want to
            change password, just type it for all password field.
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
            className="w-full inline-block mb-4 p-2 text-gray-800 border-b-2 border-blue-600 rounded shadow bg-blue-200"
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
            className="w-full inline-block mb-4 p-2 text-gray-800 border-b-2 border-blue-600 rounded shadow bg-blue-200"
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
        <div className="mb-6">
          <label
            htmlFor="phone"
            className="w-full inline-block mb-4 p-2 text-gray-800 border-b-2 border-blue-600 rounded shadow bg-blue-200"
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
            className="w-full inline-block mb-4 p-2 text-gray-800 border-b-2 border-blue-600 rounded shadow bg-blue-200"
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
            className="w-full inline-block mb-4 p-2 text-gray-800 border-b-2 border-blue-600 rounded shadow bg-blue-200"
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
        {(isError || isSuccess) && (
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
        />
      </form>
    </div>
  );
}
