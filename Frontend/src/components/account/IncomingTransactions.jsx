import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

export const IncomingTransactions = () => {
  //Get account data
  const { account } = useSelector((state) => state.userAccount);

  //Get Incoming Log List
  const incoming = account.in;

  return (
    <div className="flex justify-center items-center">
      <ul className="basis-full flex flex-col min-h-[200px] max-w-[900px] p-4 md:p-10 m-4 md:m-10 shadow bg-gray-200 rounded text-gray-800 text-center font-semibold">
        <li>
          <h2 className="text-left text-lg"> Icoming Transactions:-</h2>
        </li>
        {/* incase of there are transactions log */}
        {incoming &&
          incoming.length !== 0 &&
          incoming.map((transaction) => (
            <li
              key={transaction._id}
              className="min-h-[150px] my-4 flex flex-col gap-4 items-center justify-center flex-wrap  bg-blue-300 p-4 border-2 border-black rounded shadow"
            >
              <p>
                Transaction Date:-
                <span className="px-2  text-orange-600 underline underline-offset-2">
                  {moment(transaction.createdAt).fromNow()}
                </span>
              </p>
              <p>
                Transaction From:-
                <span className="px-2 text-blue-800 underline underline-offset-2">
                  {transaction.from}
                </span>
              </p>
              <p>
                Transaction Amount:-
                <span className="mx-2 p-2 text-white bg-green-500 rounded shadow">
                  {transaction.balance_transfered}
                </span>
              </p>
            </li>
          ))}

        {/* incase of no transactions log */}
        {!incoming ||
          (incoming.length === 0 && (
            <li className="min-h-[150px] my-4 flex items-center justify-center flex-wrap gap-2 bg-blue-300 p-4 border-2 border-black rounded shadow ">
              <p className="text-gray-800 bg-yellow-200 p-4 rounded-lg shadow">
                There is no incoming Transactions yet!
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};
