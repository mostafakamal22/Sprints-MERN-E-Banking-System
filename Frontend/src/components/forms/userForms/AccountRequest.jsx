import React, { useState, useEffect } from "react";
import { FcElectroDevices } from "react-icons/fc";
import { RiSendPlaneFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  accountRequest,
  resetUserStatus,
} from "../../../state/features/User/UserData/userSlice";
import { PaymentMethods } from "../../payment/PaymentMethods";
import FormButton from "../../shared/FormButton";
import MessagesContainer from "../../shared/MessagesContainer";
import { UseResetStatus } from "../../../hooks/UseResetStatus";

export const AccountRequest = () => {
  //state for initial balance
  const [intitialBalance, setIntitialBalance] = useState(500);

  //state for user password
  const [password, setPassword] = useState("");

  //state for alert messages
  const [msg, setMsg] = useState("");

  const { info, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.userData
  );
  const { user } = useSelector((state) => state.userAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      setMsg(message);
    }

    if (isSuccess) {
      setMsg(`Your Account Request Has Been Sent Successfully!`);
    }
  }, [isError, isSuccess, message, info, msg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //set msg to none first
    setMsg("");

    const accountRequestData = {
      balance: intitialBalance,
      token: user.token,
      oldPassword: password,
      id: user.id,
    };
    dispatch(accountRequest(accountRequestData));
  };

  UseResetStatus(() => {
    return () => {
      dispatch(resetUserStatus());
    };
  });

  return (
    <div className="max-w-5xl w-full">
      <h3 className="flex justify-center items-center text-xl text-center font-bold px-2 py-4 mb-10 bg-blue-200 border-b-4 border-blue-800 rounded shadow ">
        <FcElectroDevices className="mr-1" size={50} />
        <span>Send An Account Request</span>
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center font-semibold flex-wrap gap-4 mb-5 p-2">
          <label
            className="basis-full sm:basis-[50%] text-md  my-2 sm:my-0  p-2 border-r-4 rounded shadow bg-blue-200 border-blue-800"
            htmlFor="intitialBalance"
          >
            Enter Initial Balance
          </label>

          <input
            className="basis-full  sm:basis-1/3  px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out  focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
            type="number"
            name="intitialBalance"
            id="intitialBalance"
            value={intitialBalance}
            onChange={(e) => setIntitialBalance(e.target.value)}
            min="500"
            required
          />

          <label
            className="basis-full sm:basis-[50%] text-md  my-2 sm:my-0  p-2 border-r-4 rounded shadow bg-blue-200 border-blue-800"
            htmlFor="password"
          >
            Type your Password
          </label>

          <input
            className="basis-full  sm:basis-1/3  px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <PaymentMethods title="Add Initial Balance Via :-" />

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
          text={{ default: "Send Request", loading: "Processing" }}
          isLoading={isLoading}
          icon={<RiSendPlaneFill className="ml-1" size={25} />}
        />
      </form>
    </div>
  );
};
