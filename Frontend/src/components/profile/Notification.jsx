import React from "react";
import { BiArrowBack, BiLeftArrowAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import { FcCancel, FcIdea } from "react-icons/fc";

export const Notification = () => {
  const location = useLocation();
  //get notification id from pathname
  const notificationId = location.pathname.split("/").at(-1);
  //Get Notifications from state
  const notifications = useSelector(
    (state) => state.userData.info.notifications
  );

  let notification;

  notification = notifications.find((n) => n._id === notificationId);

  if (!notification)
    return (
      <div className="max-w-5xl min-h-screen w-full p-6 bg-slate-50  rounded shadow-lg shadow-black/30">
        <div className="flex flex-col gap-4">
          <FcCancel size={150} className="mx-auto" />

          <p className="w-full my-4 p-6 text-xl text-center font-semibold bg-yellow-200 border-r-4 border-yellow-800 rounded shadow">
            Wrong Notification Path!
          </p>

          <Link
            className="self-start mt-auto  inline-flex font-bold text-xs sm:text-sm bg-blue-700 text-white hover:bg-white px-2 sm:px-3 py-2 my-5 hover:text-blue-600 border hover:border-blue-800 items-center rounded
shadow transition-all ease-in-out duration-300"
            to={"/notifications"}
          >
            <BiLeftArrowAlt className="-mb-1" size={20} />

            <span>Notifications Page</span>
          </Link>
        </div>
      </div>
    );

  return (
    <div className="max-w-5xl min-h-screen w-full p-10 bg-slate-50 rounded shadow-lg shadow-black/30">
      {/* Heading */}
      <div className="flex items-center w-full mb-10">
        <FcIdea className="mr-1" size={50} />
        <h3 className="font-bold text-2xl  text-gray-800">Notifications</h3>
        <Link
          to={"/notifications"}
          className="ml-auto inline-flex font-bold text-xs sm:text-sm bg-white px-2 sm:px-3 py-2 text-blue-500 items-center rounded
         shadow  focus:outline-none hover:bg-blue-500 hover:text-white
          "
        >
          <BiArrowBack className="mb-[-1px] mr-1 font-bold" size={15} />
          Go Back
        </Link>
      </div>

      {/* Display notification details*/}
      <div
        className={`
        ${notification.type === "account-request" && "bg-blue-200"}
        ${
          (notification.type === "approved" ||
            notification.type === "transfered-in") &&
          "bg-green-200"
        }
        ${notification.type === "declined" && "bg-red-200"}
          px-4 sm:px-6 py-6  rounded-lg shadow w-full font-semibold
        `}
      >
        <div className="flex items-center justify-between w-full ">
          <div className="flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/893/893257.png"
              alt="Messages Icon"
              className="w-6 h-6 mr-2"
            ></img>
            <h3 className="font-bold text-xl text-gray-800">
              {notification.title}
            </h3>
          </div>
          <p className="text-xs font-semibold text-blue-900">
            {moment(notification.createdAt).fromNow()}
          </p>
        </div>
        {/* Display Notificaton Message */}
        {notification.message.split("!").map((message, index) => (
          <p key={index} className={`${!message && "hidden"} text-sm my-4`}>
            {message}.
          </p>
        ))}

        {/* Display Notificaton data */}

        {/*Case:- Account Request Notificaton*/}
        {notification.data && notification.type === "account-request" && (
          <p className="mt-1 text-sm">
            Your Account Request Id is:-
            <span className="underline underline-offset-2 text-blue-900">
              {notification.data[0].account_id}.
            </span>
          </p>
        )}

        {/*Case:- Approved Notificaton*/}
        {notification.data && notification.type === "approved" && (
          <p className="mt-1 text-sm">
            Your New Account Id is:-
            <span className="underline underline-offset-2 text-blue-900 ml-1">
              {notification.data[0].account_id}
            </span>
          </p>
        )}

        {/*Case:- New Transfer Balance Notificaton*/}
        {notification.data && notification.type === "transfered-in" && (
          <>
            {console.log(notification.message.split("!"))}
            <p className="mt-1 text-sm font-semibold">
              New Balance Transfered:-
              <span className="underline underline-offset-2 text-blue-900 ml-1">
                {new Intl.NumberFormat("ar-EG", {
                  style: "currency",
                  currency: "EGP",
                }).format(notification.data[0].transfered_Amount)}
              </span>
            </p>
            <p className="mt-1 text-sm font-semibold">
              From Account ID:-
              <span className="underline underline-offset-2 text-blue-900  ml-1">
                {notification.data[0].from}
              </span>
            </p>
          </>
        )}

        {/*Case:- Declined Account Request Notificaton*/}
        {notification.data && notification.type === "declined" && (
          <>
            <p className="mt-1 text-sm font-semibold">
              Your Initial Balance Was:-
              <span className="underline underline-offset-2 text-blue-900 ml-1">
                {new Intl.NumberFormat("ar-EG", {
                  style: "currency",
                  currency: "EGP",
                }).format(notification.data[0].initial_balance)}
              </span>
            </p>
            <p className="mt-1 text-sm font-semibold">
              Retreive Initial Balance:-
              <span className="underline underline-offset-2 text-blue-900 ml-1">
                <Link
                  state={notification.data[0].initial_balance}
                  to="/retrieve-balance"
                >
                  From Here
                </Link>
              </span>
            </p>
            <p className="mt-1 text-sm font-semibold">
              Contact Support:-
              <span className="underline underline-offset-2 text-blue-900 ml-1">
                <Link to="/contact">From Here</Link>
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};
