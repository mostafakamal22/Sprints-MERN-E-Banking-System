import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminRegister,
  resetOwnerStatus,
} from "../../../features/Admin/Owener/ownerSlice";
import FormButton from "../../shared/FormButton";
import MessagesContainer from "../../shared/MessagesContainer";

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

    if (isSuccess) {
      setFormInputs({ ...formInputs, msg: "Admin Created Succesfully" });
    }
  }, [isError, message, isSuccess, msg]);

  //clean up status
  useEffect(() => {
    return () => {
      dispatch(resetOwnerStatus());
    };
  }, []);

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
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-6">
          <label
            htmlFor="name"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Admin name
          </label>
          <input
            type="name"
            name="name"
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
            defaultValue={name}
            onChange={(e) =>
              setFormInputs({ ...formInputs, name: e.target.value })
            }
            placeholder="type admin name"
            required
          />
        </div>

        <div className="form-group mb-6">
          <label
            htmlFor="email"
            className="form-label inline-block mb-2 text-gray-700"
          >
            New Admin Email address
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
            defaultValue={email}
            onChange={(e) =>
              setFormInputs({ ...formInputs, email: e.target.value })
            }
            aria-describedby="emailHelp"
            placeholder="type admin email"
            required
          />
        </div>

        <div className="form-group mb-6">
          <label
            htmlFor="password"
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

        <div className="form-group mb-6">
          <label
            htmlFor="repeated-password"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Repeat Password
          </label>
          <input
            type="password"
            name="repeated-password"
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
            defaultValue={repeatedPassword}
            onChange={(e) =>
              setFormInputs({ ...formInputs, repeatedPassword: e.target.value })
            }
            placeholder="Repeat Password"
            required
          />
        </div>

        <div className="form-group mb-6">
          <label
            htmlFor="repeated-password"
            className="form-label inline-block mb-2 mx-2 text-gray-700"
          >
            Choose Admin Role
          </label>

          <select
            className="my-2 p-2 rounded"
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
        <MessagesContainer msg={msg} isSuccess={isSuccess} />

        {/*form button */}
        <FormButton
          text={{ loading: "Processing", default: "Add Admin" }}
          isLoading={isLoading}
        />
      </form>
    </div>
  );
};
