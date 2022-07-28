import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FcCurrencyExchange } from "react-icons/fc";
import { TiUserAdd } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../../state/features/User/Auth/authSlice";
import FormButton from "../../shared/FormButton";
import { Logo } from "../../shared/Logo";
import MessagesContainer from "../../shared/MessagesContainer";
import { InputsValidator } from "../helpers/InputsValidator";

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
    <div className="block p-6 rounded shadow-lg shadow-black/20 bg-slate-50 w-full mx-auto">
      <Logo />
      <h3 className="flex justify-center items-center text-2xl text-blue-800 font-bold text-center p-2 my-4 rounded shadow bg-blue-200 border-x-4 border-blue-800 select-none">
        <FcCurrencyExchange className="mr-1" size={45} />
        <span>Register</span>
      </h3>

      <form className="mt-10" onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-6">
          <label
            htmlFor="first_name"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
          >
            First name
          </label>
          <input
            type="text"
            name="first_name"
            defaultValue={firstName}
            onChange={(e) =>
              setFormInputs({ ...formInputs, firstName: e.target.value })
            }
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Type Your First Name"
            required
          />
        </div>
        <div className="relative z-0 w-full mb-6">
          <label
            htmlFor="last_name"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
          >
            Last name
          </label>

          <input
            type="text"
            name="last_name"
            defaultValue={lastName}
            onChange={(e) =>
              setFormInputs({ ...formInputs, lastName: e.target.value })
            }
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Type Your Last Name"
            required
          />
        </div>

        {/* name validator */}
        <InputsValidator nameInput={`${firstName} ${lastName}`} />

        <div className="relative z-0 w-full mb-6">
          <label
            htmlFor="email"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
          >
            Email address
          </label>

          <input
            type="email"
            name="email"
            defaultValue={email}
            onChange={(e) =>
              setFormInputs({ ...formInputs, email: e.target.value })
            }
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Type Your Email Address"
            required
          />
        </div>

        <div className="relative z-0 w-full mb-6">
          <label
            htmlFor="address"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
          >
            Full Address
          </label>

          <input
            type="text"
            name="address"
            defaultValue={address}
            onChange={(e) =>
              setFormInputs({ ...formInputs, address: e.target.value })
            }
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Type Your Home Address"
            required
          />
        </div>
        <div className="relative z-0 w-full mb-6">
          <label
            htmlFor="password"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
          >
            Password
          </label>

          <input
            type="password"
            name="password"
            defaultValue={password}
            onChange={(e) =>
              setFormInputs({ ...formInputs, password: e.target.value })
            }
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Type A Strong Password"
            required
          />
        </div>
        <div className="relative z-0 w-full mb-6">
          <label
            htmlFor="repeat_password"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
          >
            Confirm password
          </label>

          <input
            type="password"
            name="repeat_password"
            defaultValue={repeatPassword}
            onChange={(e) =>
              setFormInputs({ ...formInputs, repeatPassword: e.target.value })
            }
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Repeat Password"
            required
          />
        </div>

        {/* password validator */}
        <InputsValidator passwordInput={password} />

        <div className="relative z-0 w-full mb-6">
          <label
            htmlFor="phone"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
          >
            Phone Number Ex:-(01008878980)
          </label>

          <input
            type="tel"
            name="phone"
            defaultValue={phone}
            onChange={(e) =>
              setFormInputs({ ...formInputs, phone: e.target.value })
            }
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Type Your Mobile Number"
            required
          />
        </div>

        <div className="relative z-0 w-full mb-6">
          <label
            htmlFor="postal"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
          >
            Postal Code Ex:-(12345)
          </label>

          <input
            type="text"
            name="postal"
            defaultValue={postCode}
            onChange={(e) =>
              setFormInputs({ ...formInputs, postCode: e.target.value })
            }
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Type Your Postal Code"
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
          text={{ loading: "Processing", default: "Register" }}
          isLoading={isLoading}
          icon={<TiUserAdd className="mb-[-2px] ml-1" size={27} />}
        />
      </form>
    </div>
  );
}
