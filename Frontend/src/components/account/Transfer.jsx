import React, { useState, useEffect } from "react";
import { FcPaid } from "react-icons/fc";
import { RiFileTransferFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  resetAccountStatus,
  transfer,
} from "../../state/features/Account/accountSlice";
import FormButton from "../shared/FormButton";
import MessagesContainer from "../shared/MessagesContainer";
import { UseResetStatus } from "../../hooks/UseResetStatus";

export const Transfer = () => {
  //state for withdraw balance
  const [balanceTransfered, setBalanceTransfered] = useState(50);

  //state for user password
  const [password, setPassword] = useState("");

  //state for Receiving account id
  const [receivingId, setReceivingId] = useState("");

  //state for alert messages
  const [msg, setMsg] = useState("");

  const { account, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.userAccount
  );
  const { user } = useSelector((state) => state.userAuth);

  const dispatch = useDispatch();

  //get account id
  const accountId = useLocation()?.pathname?.split("/").at(-1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //set msg to none first
    setMsg("");

    const transferData = {
      balanceTransfered,
      token: user.token,
      oldPassword: password,
      id: user.id,
      from: accountId,
      to: receivingId,
    };
    dispatch(transfer(transferData));
  };

  useEffect(() => {
    if (isError) {
      setMsg(message);
    }

    if (isSuccess) {
      setMsg(
        `You Have Transfered ${new Intl.NumberFormat("ar-EG", {
          style: "currency",
          currency: "EGP",
        }).format(
          balanceTransfered
        )} To Account ID:- [${receivingId}] Successfully!`
      );
    }
  }, [isError, isSuccess, message, account, msg]);

  UseResetStatus(() => {
    return () => {
      dispatch(resetAccountStatus());
    };
  });

  return (
    <div className="max-w-5xl w-full self-start">
      <h3 className="flex justify-center items-center text-2xl text-center font-bold px-2 py-4 mb-10 bg-blue-200 border-b-4 border-blue-800 rounded shadow ">
        <FcPaid className="mr-1" size={50} />
        Transfer Money
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center font-semibold flex-wrap gap-4 mb-5 p-2">
          <label
            className="basis-full sm:basis-[50%] text-md  my-2 sm:my-0  p-2 border-r-4 rounded shadow bg-blue-200 border-blue-800"
            htmlFor="balanceTransfered"
          >
            Transfer Amount
          </label>

          <input
            className="basis-full  sm:basis-1/3  px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out  focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
            type="number"
            name="balanceTransfered"
            id="balanceTransfered"
            value={balanceTransfered}
            onChange={(e) => setBalanceTransfered(e.target.value)}
            min="50"
            required
          />

          <label
            className="basis-full sm:basis-[50%] text-md  my-2 sm:my-0  p-2 border-r-4 rounded shadow bg-blue-200 border-blue-800"
            htmlFor="recipientId"
          >
            Recipient Account ID
          </label>

          <input
            className="basis-full  sm:basis-1/3  px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out  focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
            type="text"
            name="recipientId"
            id="recipientId"
            value={receivingId}
            onChange={(e) => setReceivingId(e.target.value)}
            required
          />

          <label
            className="basis-full sm:basis-[50%] text-md  my-2 sm:my-0  p-2 border-r-4 rounded shadow bg-blue-200 border-blue-800"
            htmlFor="password"
          >
            Type your Password
          </label>

          <input
            className="basis-full  sm:basis-1/3  px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out  focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          text={{ default: "Transfer", loading: "Processing" }}
          isLoading={isLoading}
          icon={<RiFileTransferFill className="ml-1" size={25} />}
        />
      </form>
    </div>
  );
};
