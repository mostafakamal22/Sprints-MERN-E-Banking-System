import React from "react";
import { useEffect } from "react";
import { BiCoinStack, BiMoney, BiTransfer } from "react-icons/bi";
import { RiFundsBoxFill, RiRefund2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getAccount } from "../../features/Account/AccountSlice";
import { MainSpinner } from "../shared/MainSpinner";
import MessagesContainer from "../shared/MessagesContainer";

export const Account = () => {
  const dispatch = useDispatch();

  //Get account id from location pathname
  const accountId = useLocation().pathname.split("/").at(-1);

  //Get user data
  const { user } = useSelector((state) => state.userAuth);

  useEffect(() => {
    const payload = {
      token: user.token,
      accountId,
    };
    dispatch(getAccount(payload));
  }, [accountId, user]);

  //Get account data
  const { account, isLoading, isError, message } = useSelector(
    (state) => state.userAccount
  );

  //Show Loading Spinner
  if (isLoading) {
    return <MainSpinner />;
  }

  //Show Error Container
  if (isError) {
    return (
      <div className="flex flex-col justify-center bg-gray-200 min-h-[350px] p-4 md:p-10 m-4 md:m-10 rounded shadow">
        <MessagesContainer isError={isError} msg={message} />
        <Link
          className="self-end my-2 p-2 rounded shadow bg-blue-600 text-white hover:underline"
          to={"/"}
        >
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[200px] p-4 md:p-10 m-4 md:m-10 shadow bg-gray-200 rounded text-gray-800 text-center font-semibold">
      <div className="min-h-[150px] flex items-center justify-center flex-wrap gap-2 bg-blue-300 p-4 border-2 border-black rounded shadow my-4">
        <div className="text-lg basis-full md:basis-[45%] self-start">
          <p className="text-lg mb-3">Account balance</p>
          <div className="bg-green-500 text-white p-2 rounded-md">
            {account.balance} <span className="text-sm font-thin italic"></span>
            L.E
          </div>
        </div>

        <div className="basis-full md:basis-[45%] text-center">
          <Link
            to={`/account/tranfer/${account._id}`}
            className="flex justify-center items-center p-4 bg-blue-900 text-white rounded shadow hover:underline"
          >
            Transfer
            <BiTransfer className="mb-[-5px] ml-2" size={20} />
          </Link>
        </div>
      </div>

      <div className="min-h-[150px] flex items-center justify-center flex-wrap gap-2 bg-blue-300 p-4 border-2 border-black rounded shadow">
        <Link
          to={`/account/withdraw/${account._id}`}
          className="basis-full md:basis-[45%] flex justify-center items-center p-4 bg-gray-500 text-white rounded shadow hover:underline"
        >
          Withdrawal
          <BiMoney className="mb-[-4px] ml-2" size={20} />
        </Link>
        <Link
          to={`/account/deposit/${account._id}`}
          className="basis-full md:basis-[45%] flex justify-center items-center p-4 bg-green-900 text-white rounded shadow hover:underline"
        >
          deposit
          <BiCoinStack className="mb-[-4px] ml-2" size={20} />
        </Link>
      </div>

      <div className="min-h-[150px] my-4 flex items-center justify-center flex-wrap gap-2 bg-blue-300 p-4 border-2 border-black rounded shadow">
        <Link
          to={`/account/in/${account._id}`}
          className="basis-full md:basis-[45%] flex justify-center items-center p-4 bg-gray-500 text-white rounded shadow hover:underline"
        >
          Incoming Transactions
          <RiRefund2Line className="mb-[-4px] ml-2" size={20} />
        </Link>
        <Link
          to={`/account/out/${account._id}`}
          className="basis-full md:basis-[45%] flex justify-center items-center p-4 bg-green-900 text-white rounded shadow hover:underline"
        >
          Outgoing Transactions
          <RiFundsBoxFill className="mb-[-4px] ml-2" size={20} />
        </Link>
      </div>
    </div>
  );
};
