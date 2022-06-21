import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetUserStatus, updateUser } from "../../features/User/userSlice";
import FormButton from "../shared/FormButton";
import MessagesContainer from "../shared/MessagesContainer";

export default function UpdateUser() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { info, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.data
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

  //seperate clean up for status msg (reset status only on unmount)
  useEffect(() => {
    return () => {
      dispatch(resetUserStatus());
    };
  }, []);

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
              setFromInputs({ ...fromInputs, email: e.target.value })
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
              setFromInputs({ ...fromInputs, oldPassword: e.target.value })
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
              setFromInputs({ ...fromInputs, password: e.target.value })
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
              setFromInputs({
                ...fromInputs,
                repeatedPassword: e.target.value,
              })
            }
            placeholder="Repeat New Password"
            required
          />
        </div>
        <div className="form-group mb-6">
          <label
            htmlFor="phone"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Phone
          </label>
          <input
            type="text"
            name="phone"
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
        <div className="form-group mb-6">
          <label
            htmlFor="address"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Full Address
          </label>
          <input
            type="text"
            name="address"
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
        <div className="form-group mb-6">
          <label
            htmlFor="postal"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Post/Zip Code
          </label>
          <input
            type="text"
            name="postal"
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
