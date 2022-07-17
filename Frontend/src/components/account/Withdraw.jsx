import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  resetAccountStatus,
  withdraw,
} from "../../features/Account/AccountSlice";
import { PaymentMethods } from "../payment/PaymentMethods";
import FormButton from "../shared/FormButton";
import MessagesContainer from "../shared/MessagesContainer";

export const Withdraw = () => {
  //state for withdraw balance
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  //state for user password
  const [password, setPassword] = useState("");

  //state for alert messages
  const [msg, setMsg] = useState("");

  const { account, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.userAccount
  );
  const { user } = useSelector((state) => state.userAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      setMsg(message);
    }

    if (isSuccess) {
      setMsg(`You Have Withdrawn ${withdrawAmount}L.E Successfully!`);
    }
  }, [isError, isSuccess, message, account, msg]);

  //clean up status
  useEffect(() => {
    return () => {
      dispatch(resetAccountStatus());
    };
  }, []);

  //get account id
  const accountId = useLocation().pathname.split("/").at(-1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //set msg to none first
    setMsg("");

    const withdrawData = {
      accountId,
      withdrawAmount,
      token: user.token,
      oldPassword: password,
      id: user.id,
    };
    dispatch(withdraw(withdrawData));
  };

  return (
    <div className="block p-6 rounded shadow-lg bg-gray-200 max-w-2xl mx-auto">
      <h2 className="text-xl text-center px-2 py-4 my-4 rounded shadow bg-white">
        Withdraw Money
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center flex-wrap gap-4 px-5 py-10 my-4 rounded shadow bg-white">
          <label
            className="basis-full sm:basis-[50%] text-md  my-2 sm:my-0 mx-2 p-2 sm:border-r-2 rounded shadow bg-blue-200 border-blue-600"
            htmlFor="withdrawAmount"
          >
            Enter Withdraw Amount
          </label>

          <input
            className="basis-full  sm:basis-[15%]  px-3 py-1.5 mx-4 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="number"
            name="withdrawAmount"
            defaultValue={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            min="0"
            required
          />

          <label
            className="basis-full sm:basis-[50%] text-md  my-2 sm:my-0 mx-2 p-2 sm:border-r-2 rounded shadow bg-blue-200 border-blue-600"
            htmlFor="password"
          >
            Type your Password
          </label>

          <input
            className="basis-full  sm:basis-[15%]  px-3 py-1.5 mx-4 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="password"
            name="password"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <PaymentMethods title="Withdraw Methods" />

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
          text={{ default: "Withdraw", loading: "Processing" }}
          isLoading={isLoading}
        />
      </form>
    </div>
  );
};
