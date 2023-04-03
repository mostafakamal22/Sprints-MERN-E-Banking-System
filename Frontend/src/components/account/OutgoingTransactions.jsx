import moment from "moment";
import React from "react";
import { FcShipped } from "react-icons/fc";
import { useSelector } from "react-redux";
import { PaginationOutgoingList } from "../helpers/PaginationOutgoingList";
import {
  FaCalendarAlt,
  FaInfoCircle,
  FaMoneyBillWave,
  FaUser,
} from "react-icons/fa";

export const OutgoingTransactions = () => {
  //Get account data
  const { account } = useSelector((state) => state.userAccount);

  //Get OutGoing Log List
  const outgoing = account.out;

  //OutGoing Transaction UI Data
  const outgoingTransaction = (transaction) => {
    return (
      <li
        key={transaction._id}
        className="min-h-[150px] my-4 flex flex-col gap-2 items-center justify-center flex-wrap bg-blue-200 p-4 border-x-4 border-blue-800 rounded shadow"
      >
        <p className="w-full flex items-center md:justify-center">
          <FaCalendarAlt className="inline-block mr-2" />
          Date:
          <span className="ml-auto md:mx-2 p-2 bg-orange-600 rounded text-white">
            {moment(transaction.createdAt).format("DD-MM-YYYY")}
          </span>
        </p>
        <p className="w-full flex items-center md:justify-center">
          <FaUser className="inline-block mr-2" />
          To:
          <span className="ml-auto md:mx-2 p-2 bg-blue-600 rounded text-white">
            {transaction.to}
          </span>
        </p>
        <p className="w-full flex items-center md:justify-center">
          <FaMoneyBillWave className="inline-block mr-2" />
          Amount:
          <span className="ml-auto md:mx-2 p-2 text-white bg-green-500 rounded">
            {new Intl.NumberFormat("ar-EG", {
              style: "currency",
              currency: "EGP",
            }).format(transaction.balance_transfered)}
          </span>
        </p>
      </li>
    );
  };

  //In case Of No Transactions Log
  if (!outgoing || outgoing.length === 0)
    return (
      <div className="max-w-2xl w-full mx-auto my-4 flex flex-col gap-4 items-center justify-center flex-wrap  bg-pink-100 p-4 border-2 border-pink-800 rounded shadow">
        <FaInfoCircle className="text-yellow-500" size={60} />

        <p className="text-gray-800 text-base font-semibold">
          You Have Not Sent Any Transactions Yet
        </p>
      </div>
    );

  return (
    <div className="max-w-5xl w-full self-start">
      <h3 className="flex justify-center items-center text-2xl text-center font-bold px-2 py-4 mb-10 bg-blue-200 border-b-4 border-blue-800 rounded shadow ">
        <FcShipped className="mr-1" size={50} />
        Outgoing Transactions
      </h3>

      <PaginationOutgoingList
        outgoingTransactions={outgoing.slice(0).reverse()}
        outgoingTransaction={outgoingTransaction}
        rowsPerPage={10}
      />
    </div>
  );
};
