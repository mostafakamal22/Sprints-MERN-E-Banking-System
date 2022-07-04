import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ApproveAccountRequest,
  declineAccountRequest,
  resetAccountRequestsStatus,
} from "../../features/Admin/AccountRequests/accountRequestsSlice";
import FormButton from "../shared/FormButton";
import { MainSpinner } from "../shared/MainSpinner";
import MessagesContainer from "../shared/MessagesContainer";

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

    if (isSuccess) {
      setMsg("Success!");
    }
  }, [isError, message, isSuccess, msg]);

  //clean up account requests status
  useEffect(() => {
    return () => {
      dispatch(resetAccountRequestsStatus());
    };
  }, []);

  return (
    <div className="bg-white p-5">
      <h3 className="text-lg font-bold text-blue-900 my-5">
        {" "}
        Users Account Requests List (
        {filteredRequests && filteredRequests.length}){" "}
      </h3>

      {/*search admins with name*/}
      <div className="flex justify-center items-center flex-wrap md:flex-nowrap gap-4 mb-6 p-4 bg-blue-400 rounded-md">
        <label
          htmlFor="searchQuery"
          className="block w-full
          md:w-auto text-black
          "
        >
          Search Requests By id:-
        </label>

        <input
          type="text"
          name="searchQuery"
          className="
          block
          w-full
          md:w-auto
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-500
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-black focus:shadow-md focus:outline-none"
          placeholder="search Request"
          defaultValue={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/*Request Status and Errors*/}
      {(isError || isSuccess) && (
        <MessagesContainer msg={msg} isSuccess={isSuccess} isError={isError} />
      )}
      <ul className="flex flex-col justify-center">
        <li className="flex justify-between items-center flex-wrap text-black border p-2">
          <span>User Id</span>
          <span>Request Id</span>
          <span>Initial Balance</span>
          <span>Decline Request</span>
          <span>Approve Request</span>
        </li>

        {/* Show spinner when Loading State is true */}
        {isLoading && <MainSpinner />}

        {/* if there no search query >>> just display accountRequestsList === filteredRequests  */}
        {filteredRequests &&
          !isLoading &&
          filteredRequests.map((request) => (
            <li
              key={request._id}
              className="flex justify-between items-center flex-wrap border p-2"
            >
              {/*User Id*/}
              <span> {request.client_id} </span>

              {/*request Id*/}
              <span> {request._id} </span>

              {/*request Initial Balance*/}
              <span> {request.initial_balance} </span>

              {/* Decline request */}
              <form onSubmit={(event) => handleDecline(event, request._id)}>
                <FormButton text={{ default: "Decline" }} />
              </form>

              {/* approve request */}
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
                <FormButton text={{ default: "Approve" }} />
              </form>
            </li>
          ))}

        {/* if there is search query no admin matches >>> just display msg  */}

        {searchQuery && filteredRequests.length === 0 && !isLoading && (
          <li className="bg-red-500 text-white my-4 py-4 px-2 rounded">
            There No Search Result!
          </li>
        )}
      </ul>
    </div>
  );
};

export default UsersAccountRequests;
