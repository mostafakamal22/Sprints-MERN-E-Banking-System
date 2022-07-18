import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FcLightAtTheEndOfTunnel } from "react-icons/fc";
import { TiUserAdd } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, resetAuthStatus } from "../../features/Auth/authSlice";
import { UseResetStatus } from "../../hooks/UseResetStatus";
import FormButton from "../shared/FormButton";
import MessagesContainer from "../shared/MessagesContainer";

export default function Register() {
  const [formInputs, setFormInputs] = useState({
    firstName: "",
    lastName: "",
    password: "",
    repeatPassword: "",
    email: "",
    phone: "",
    address: "",
    postCode: "",
    msg: "",
  });

  const {
    postCode,
    email,
    password,
    phone,
    address,
    lastName,
    firstName,
    repeatPassword,
    msg,
  } = formInputs;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.userAuth
  );

  useEffect(() => {
    if (isError) {
      setFormInputs({ ...formInputs, msg: message });
    }

    if (user || isSuccess) {
      setFormInputs({
        ...formInputs,
        msg: "Registered Succesfully",
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [user, isError, isSuccess, message]);

  //clean up  status (on unmount)
  UseResetStatus(() => {
    return () => {
      dispatch(resetAuthStatus());
    };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    //set error msg to none first
    setFormInputs({ ...formInputs, msg: "" });
    //check for password match > then show error msg
    if (password !== repeatPassword) {
      setFormInputs({ ...formInputs, msg: "password does not match" });
      return;
    }

    const userData = {
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
      phone: phone.trim(),
      postal: postCode.trim(),
      addresse: address.trim(),
      password,
    };

    dispatch(register(userData));
  };

  return (
    <form
      className="max-w-xl p-10 px-12 mx-auto bg-white rounded-md"
      onSubmit={handleSubmit}
    >
      <h2 className="flex justify-center items-center text-xl font-bold text-center px-2 py-4 my-6 rounded shadow bg-gray-200 border-b-2 border-blue-600">
        <FcLightAtTheEndOfTunnel className="mr-1" size={45} />
        <span>E-Bank Register</span>
      </h2>
      <div className="grid xl:grid-cols-2 xl:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="first_name"
            defaultValue={firstName}
            onChange={(e) =>
              setFormInputs({ ...formInputs, firstName: e.target.value })
            }
            className="block py-2.5 px-0 w-full text-sm text-green-600 font-bold bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="first_name"
            className="peer-focus:font-medium absolute text-sm text-dark font-semibold  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            First name
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="last_name"
            defaultValue={lastName}
            onChange={(e) =>
              setFormInputs({ ...formInputs, lastName: e.target.value })
            }
            className="block py-2.5 px-0 w-full text-sm text-green-600 font-bold bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="last_name"
            className="peer-focus:font-medium absolute text-sm text-dark font-semibold  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Last name
          </label>
        </div>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="email"
          name="email"
          defaultValue={email}
          onChange={(e) =>
            setFormInputs({ ...formInputs, email: e.target.value })
          }
          className="block py-2.5 px-0 w-full text-sm text-green-600 font-bold bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-dark font-semibold  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email address
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="address"
          defaultValue={address}
          onChange={(e) =>
            setFormInputs({ ...formInputs, address: e.target.value })
          }
          className="block py-2.5 px-0 w-full text-sm text-green-600 font-bold bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="address"
          className="peer-focus:font-medium absolute text-sm text-dark font-semibold  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Full Address
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="password"
          name="password"
          defaultValue={password}
          onChange={(e) =>
            setFormInputs({ ...formInputs, password: e.target.value })
          }
          className="block py-2.5 px-0 w-full text-sm text-green-600 font-bold bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="password"
          className="peer-focus:font-medium absolute text-sm text-dark font-semibold  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="password"
          name="repeat_password"
          defaultValue={repeatPassword}
          onChange={(e) =>
            setFormInputs({ ...formInputs, repeatPassword: e.target.value })
          }
          className="block py-2.5 px-0 w-full text-sm text-green-600 font-bold bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="repeat_password"
          className="peer-focus:font-medium absolute text-sm text-dark font-semibold  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Confirm password
        </label>
      </div>

      <div className="grid xl:grid-cols-2 xl:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="tel"
            name="phone"
            defaultValue={phone}
            onChange={(e) =>
              setFormInputs({ ...formInputs, phone: e.target.value })
            }
            className="block py-2.5 px-0 w-full text-sm text-green-600 font-bold bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-dark font-semibold  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone Number Ex:(01008878980)
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="postal"
            defaultValue={postCode}
            onChange={(e) =>
              setFormInputs({ ...formInputs, postCode: e.target.value })
            }
            className="block py-2.5 px-0 w-full text-sm text-green-600 font-bold bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />

          <label
            htmlFor="postal"
            className="peer-focus:font-medium absolute text-sm text-dark font-semibold  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Postal Code (Ex. 12345)
          </label>
        </div>
      </div>

      {/*Request Status and Errors*/}
      {(isError || isSuccess) && (
        <MessagesContainer msg={msg} isSuccess={isSuccess} isError={isError} />
      )}

      {/*form button */}
      <FormButton
        text={{ loading: "Processing", default: "Register" }}
        isLoading={isLoading}
        icon={<TiUserAdd className="mb-[-2px] ml-1" size={27} />}
      />
    </form>
  );
}
