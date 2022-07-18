import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ApproveAccountRequest,
  declineAccountRequest,
  resetAccountRequestsStatus,
} from "../../features/Admin/AccountRequests/accountRequestsSlice";
import { UseResetStatus } from "../../hooks/UseResetStatus";
import FormButton from "../shared/FormButton";
import { MainSpinner } from "../shared/MainSpinner";
import MessagesContainer from "../shared/MessagesContainer";
import { FcApprove, FcDisapprove } from "react-icons/fc";

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
    <div className="max-w-6xl px-5 py-10 mx-4 md:mx-15 bg-white">
      <h3 className="text-lg font-bold text-gray-900 my-5">
        Users Account Requests List (
        {filteredRequests && filteredRequests.length})
      </h3>

      {/*search admins with name*/}
      <div className="flex justify-center items-center flex-wrap md:flex-nowrap gap-4 mb-6 p-4 bg-blue-200 rounded-md">
        <label
          htmlFor="searchQuery"
          className="block w-full md:w-auto text-black"
        >
          Search Requests By id:-
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

      {/*Request Status and Errors*/}
      {(isError || isSuccess) && (
        <MessagesContainer msg={msg} isSuccess={isSuccess} isError={isError} />
      )}

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-left text-gray-500 border-y-4 border-blue-600 rounded">
          <thead className="text-gray-900 uppercase bg-gray-300">
            <tr>
              <th scope="col" className="py-3 px-6 text-center border-x-2">
                User Id
              </th>
              <th scope="col" className="py-3 px-6 text-center border-x-2">
                Request Id
              </th>
              <th scope="col" className="py-3 px-6 text-center border-x-2">
                Initial Balance
              </th>
              <th scope="col" className="py-3 px-6 text-center border-x-2">
                Decline Request
              </th>

              <th scope="col" className="py-3 px-6 text-center border-x-2">
                Approve Request
              </th>
            </tr>
          </thead>
          <tbody>
            {/* if there no search query >>> just display requestList === filteredRequests  */}
            {filteredRequests &&
              !isLoading &&
              filteredRequests.map((request, index) => (
                <tr
                  key={request._id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } border-b `}
                >
                  {/*User Id*/}
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap  border-x-2 text-center"
                  >
                    {request.client_id}
                  </th>

                  {/*request Id*/}
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap  border-x-2 text-center"
                  >
                    {request._id}
                  </th>

                  {/*request Initial Balance*/}
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap  border-x-2 text-center"
                  >
                    {request.initial_balance}
                  </th>

                  {/* Decline request */}
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap  border-x-2 text-center"
                  >
                    <form
                      onSubmit={(event) => handleDecline(event, request._id)}
                    >
                      <FormButton
                        text={{ default: "Decline" }}
                        bgColor={["bg-red-600", "bg-red-700", "bg-red-800"]}
                        icon={<FcDisapprove size={27} />}
                      />
                    </form>
                  </th>

                  {/* approve request */}
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap  border-x-2 text-center"
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
                        icon={<FcApprove size={27} />}
                      />
                    </form>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Show spinner when Loading State is true */}
      {isLoading && <MainSpinner />}

      {/* if there is search query no request matches >>> just display msg  */}
      {searchQuery && filteredRequests.length === 0 && !isLoading && (
        <div className="bg-red-500 text-white my-4 py-4 px-2 rounded">
          There No Search Result!
        </div>
      )}
    </div>
  );
};

export default UsersAccountRequests;
