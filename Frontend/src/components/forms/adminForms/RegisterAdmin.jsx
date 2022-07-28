import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminRegister,
  resetOwnerStatus,
} from "../../../state/features/Admin/Owener/ownerSlice";
import { UseResetStatus } from "../../../hooks/UseResetStatus";
import FormButton from "../../shared/FormButton";
import MessagesContainer from "../../shared/MessagesContainer";
import { FcPlus } from "react-icons/fc";
import { AiFillPlusCircle } from "react-icons/ai";
import { InputsValidator } from "../helpers/InputsValidator";

export const RegisterAdmin = () => {
  const dispatch = useDispatch();

  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
    repeatedPassword: "",
    role: "admin",
    name: "",
    msg: "",
  });

  const { email, password, repeatedPassword, role, name, msg } = formInputs;

  const { info } = useSelector((state) => state.adminAuth);

  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.ownerData
  );

  useEffect(() => {
    if (isError) {
      setFormInputs({ ...formInputs, msg: message });
    }

    if (isSuccess && message) {
      setFormInputs({ ...formInputs, msg: message });
    }
  }, [isError, message, isSuccess, msg]);

  //clean up for owner status (on mount , unmount)
  UseResetStatus(() => {
    dispatch(resetOwnerStatus());
  });

  UseResetStatus(() => {
    return () => {
      dispatch(resetOwnerStatus());
    };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    //set msg to none first
    setFormInputs({ ...formInputs, msg: "" });

    //check for password match > then show error msg
    if (password !== repeatedPassword) {
      setFormInputs({ ...formInputs, msg: "password does not match" });
      return;
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      token: info.token.trim(),
      role,
      password,
    };
    dispatch(adminRegister(payload));
  };

  return (
    <div className="max-w-5xl w-full p-6 bg-slate-50 rounded shadow-lg shadow-black/30">
      <h3 className="flex items-center justify-center text-2xl text-center font-bold px-2 py-4 mb-10 rounded shadow bg-blue-200 border-b-4 border-blue-800 text-gray-900">
        <FcPlus className="mr-2" size={50} />
        <span>Add New Admin</span>
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
          >
            New Admin Name
          </label>
          <input
            type="name"
            name="name"
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
            defaultValue={name}
            onChange={(e) =>
              setFormInputs({ ...formInputs, name: e.target.value })
            }
            placeholder="type admin name"
            required
          />
        </div>

        {/* name validator */}
        <InputsValidator nameInput={name} />

        <div className="mb-6">
          <label
            htmlFor="email"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
          >
            New Admin Email address
          </label>
          <input
            type="email"
            name="email"
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
            defaultValue={email}
            onChange={(e) =>
              setFormInputs({ ...formInputs, email: e.target.value })
            }
            aria-describedby="emailHelp"
            placeholder="type admin email"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
          >
            New Admin Password
          </label>
          <input
            type="password"
            name="password"
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
            defaultValue={password}
            onChange={(e) =>
              setFormInputs({ ...formInputs, password: e.target.value })
            }
            placeholder="Password"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="repeated-password"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
          >
            Repeat Password
          </label>
          <input
            type="password"
            name="repeated-password"
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
            defaultValue={repeatedPassword}
            onChange={(e) =>
              setFormInputs({ ...formInputs, repeatedPassword: e.target.value })
            }
            placeholder="Repeat Password"
            required
          />
        </div>

        {/* password validator */}
        <InputsValidator passwordInput={password} />

        <div className="mb-6 text-center">
          <label
            htmlFor="role"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 text-left border-b-4 border-blue-800 rounded shadow bg-blue-200"
          >
            Choose Admin Role
          </label>

          <select
            name="role"
            className="my-2 mx-auto p-2 rounded bg-slate-900 text-white  font-bold"
            defaultValue={role}
            onChange={(e) =>
              setFormInputs({ ...formInputs, role: e.target.value })
            }
          >
            <option defaultValue={"admin"}>admin</option>
            <option defaultValue={"owner"}>owner</option>
          </select>
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
          text={{ loading: "Processing", default: "Add Admin" }}
          isLoading={isLoading}
          icon={<AiFillPlusCircle className="my-auto ml-1" size={25} />}
        />
      </form>
    </div>
  );
};
