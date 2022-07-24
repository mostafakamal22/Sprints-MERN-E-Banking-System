import moment from "moment";
import React from "react";
import { FcShipped } from "react-icons/fc";
import { useSelector } from "react-redux";
import { PaginationOutgoingList } from "../helpers/PaginationOutgoingList";

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
        className="min-h-[150px] my-4 flex flex-col gap-4 items-center justify-center flex-wrap  bg-blue-200 p-4 border-x-4 border-blue-800 rounded shadow"
      >
        <p className="w-full text-left md:text-center my-2">
          Transaction Date:-
          <span className="px-2  text-orange-600 underline underline-offset-2">
            {moment(transaction.createdAt).fromNow()}
          </span>
        </p>
        <p className="w-full text-left md:text-center my-2">
          Transfered To:-
          <span className="px-2 text-blue-800 underline underline-offset-2">
            {transaction.to}
          </span>
        </p>
        <p className="w-full text-left md:text-center my-2">
          Transaction Amount:-
          <span className="mx-2 p-2 text-white bg-green-500 rounded shadow">
            {new Intl.NumberFormat("ar-EG", {
              style: "currency",
              currency: "EGP",
            }).format(transaction.balance_transfered)}
          </span>
        </p>
      </li>
    );
  };

  //Incase Of No Transactions Log
  if (!outgoing || outgoing.length === 0)
    return (
      <div className="max-w-5xl w-full p-6 bg-slate-50 rounded shadow-lg shadow-black/30">
        <div className="min-h-[150px] my-4 flex flex-col gap-4 items-center justify-center flex-wrap  bg-yellow-100 p-4 border-x-4 border-yellow-800 rounded shadow">
          <p className="text-gray-800 text-xl p-4 font-bold">
            There is no Outgoing Transactions yet!
          </p>
        </div>
      </div>
    );

  return (
    <div className="max-w-5xl w-full p-6 bg-slate-50 rounded shadow-lg shadow-black/30">
      <h3 className="flex justify-center items-center text-2xl text-center font-bold px-2 py-4 mb-10 bg-blue-200 border-b-4 border-blue-800 rounded shadow ">
        <FcShipped className="mr-1" size={50} />
        Outgoing Transactions
      </h3>

      {/* incase of there are transactions log */}
      {outgoing && outgoing.length !== 0 && (
        <PaginationOutgoingList
          outgoingTransactions={outgoing.slice(0).reverse()}
          outgoingTransaction={outgoingTransaction}
          rowsPerPage={10}
        />
      )}
    </div>
  );
};
