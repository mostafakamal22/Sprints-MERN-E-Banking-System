import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ApproveAccountRequest,
  declineAccountRequest,
  resetAccountRequestsStatus,
} from "../../state/features/Admin/AccountRequests/accountRequestsSlice";
import { UseResetStatus } from "../../hooks/UseResetStatus";
import FormButton from "../shared/FormButton";
import { MainSpinner } from "../shared/MainSpinner";
import MessagesContainer from "../shared/MessagesContainer";
import { FcSearch } from "react-icons/fc";
import { PaginationTable } from "../helpers/PaginationTable";
import { TiDelete } from "react-icons/ti";
import { AiFillCheckCircle } from "react-icons/ai";

const tableHeaderTitles = [
  "User Id",
  "Request Id",
  "Initial Balance",
  "Decline Request",
  "Approve Request",
];

const UsersAccountRequests = ({ accountRequestsList }) => {
  const { info } = useSelector((state) => state.adminAuth);

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.accountRequests
  );

  const dispatch = useDispatch();

  //search query state
  const [searchQuery, setSearchQuery] = useState("");

  //search message state
  const [msg, setMsg] = useState("");

  //filtered requests list
  const filteredRequests =
    accountRequestsList &&
    accountRequestsList.filter((request) => {
      if (request._id.includes(searchQuery.trim())) {
        return request;
      }
    });

  // handle decline request
  const handleDecline = (e, declinedID) => {
    e.preventDefault();

    //get owner token
    const token = info.token;

    //payload (owner token + id of the request to decline)
    const payload = {
      id: declinedID,
      token,
    };

    dispatch(declineAccountRequest(payload));
  };

  // handle Approve Account Request
  const handleApproving = (e, userId, requestId, balance) => {
    e.preventDefault();

    //get owner token
    const token = info.token;

    //payload
    const payload = {
      id: userId,
      request_id: requestId,
      balance,
      token,
    };

    dispatch(ApproveAccountRequest(payload));
  };

  useEffect(() => {
    if (isError) {
      setMsg(message);
    }

    if (isSuccess && message) {
      setMsg(message);
    }
  }, [isError, message, isSuccess, msg]);

  //Define table data
  const tableHeader = (
    <tr>
      {tableHeaderTitles.map((title) => (
        <th
          key={title}
          scope="col"
          className="py-3 px-3 text-center border-x-2"
        >
          {title}
        </th>
      ))}
    </tr>
  );

  const tableRow = (request, index) => {
    return (
      <tr
        key={request._id}
        className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"} border-b `}
      >
        {/*User Id*/}
        <th
          scope="row"
          className="p-2 text-gray-900 whitespace-nowrap  border-x-2 text-center"
        >
          {request.client_id}
        </th>

        {/*request Id*/}
        <th
          scope="row"
          className="p-2 text-gray-900 whitespace-nowrap  border-x-2 text-center"
        >
          {request._id}
        </th>

        {/*request Initial Balance*/}
        <th
          scope="row"
          className="p-2 text-gray-900 whitespace-nowrap  border-x-2 text-center"
        >
          {new Intl.NumberFormat("ar-EG", {
            style: "currency",
            currency: "EGP",
          }).format(request.initial_balance)}
        </th>

        {/* Decline request */}
        <th
          scope="row"
          className="p-2 text-gray-900 whitespace-nowrap  border-x-2 text-center"
        >
          <form onSubmit={(event) => handleDecline(event, request._id)}>
            <FormButton
              text={{ default: "Decline" }}
              bgColor={["bg-red-600", "bg-red-700", "bg-red-800"]}
              icon={<TiDelete className="-mb-1" size={27} />}
            />
          </form>
        </th>

        {/* approve request */}
        <th
          scope="row"
          className="p-2 text-gray-900 whitespace-nowrap  border-x-2 text-center"
        >
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={(event) =>
              handleApproving(
                event,
                request.client_id,
                request._id,
                request.initial_balance
              )
            }
          >
            <FormButton
              text={{ default: "Approve" }}
              icon={<AiFillCheckCircle className="ml-1" size={25} />}
            />
          </form>
        </th>
      </tr>
    );
  };

  //clean up for account requests status (on mount , unmount)
  UseResetStatus(() => {
    dispatch(resetAccountRequestsStatus());
  });

  UseResetStatus(() => {
    return () => {
      dispatch(resetAccountRequestsStatus());
    };
  });

  return (
    <div className="max-w-5xl w-full overflow-x-auto  p-6 bg-slate-50 rounded shadow-lg shadow-black/30">
      <h3 className="text-2xl my-10 p-3 text-center font-bold bg-blue-200 text-gray-900 border-b-4 border-blue-800 rounded shadow">
        Users Account Requests List (
        {filteredRequests && filteredRequests.length})
      </h3>

      {/*search request by id*/}
      {(accountRequestsList.length !== 0 || isLoading) && (
        <div className="flex justify-center items-center flex-wrap md:flex-nowrap gap-4 mb-6 p-4 bg-blue-200 rounded-md border-b-4 border-blue-800">
          <label
            htmlFor="searchQuery"
            className="flex items-center w-full md:w-auto text-black font-bold"
          >
            <FcSearch size={40} /> <span>Search Requests By id:- </span>
          </label>

          <input
            type="text"
            name="searchQuery"
            className="block w-full md:w-auto px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-500 rounded transition ease-in-out m-0
          focus:text-gray-700 focus:bg-white focus:border-black focus:shadow-md focus:outline-none"
            placeholder="search Request"
            defaultValue={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {/*Request Status and Errors*/}
      {(isError || isSuccess) && msg && (
        <MessagesContainer msg={msg} isSuccess={isSuccess} isError={isError} />
      )}

      {/*Display Table All Data Needed*/}
      {!isLoading && filteredRequests.length > 0 && (
        <PaginationTable
          tableRow={tableRow}
          tableHeader={tableHeader}
          tableBodyData={filteredRequests}
          rowsPerPage={5}
        />
      )}

      {/* if there is No Request Records */}
      {!searchQuery && filteredRequests.length === 0 && !isLoading && (
        <div className="bg-yellow-200 text-gray-800 text-center font-bold my-4 py-4 px-2 border-l-4 border-yellow-600 rounded">
          There No Request Records Currently!
        </div>
      )}

      {/* if there is search query no request matches >>> No Search Found */}
      {searchQuery && filteredRequests.length === 0 && !isLoading && (
        <div className="bg-red-200 text-gray-800 text-center font-bold my-4 py-4 px-2 border-l-4 border-red-600 rounded">
          There No Search Result!
        </div>
      )}

      {/* Show spinner when Loading State is true */}
      {isLoading && <MainSpinner />}
    </div>
  );
};

export default UsersAccountRequests;
