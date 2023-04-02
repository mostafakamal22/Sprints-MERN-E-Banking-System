import React from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
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
      <div className="max-w-5xl w-full">
        <div className="flex justify-center items-center flex-col gap-4  w-full p-6  bg-white rounded shadow-lg">
          <FcCancel size={150} className="mx-auto" />

          <p className="w-full text-lg font-semibold text-center text-red-500 bg-red-100 border border-red-200 rounded p-4 mb-6">
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
    <div className="max-w-2xl w-full self-start">
      {/* Heading */}
      <div className="flex items-center w-full mb-10">
        <FcIdea className="mx-auto md:ml-0 md:mr-1" size={50} />
        <h3 className="font-bold text-2xl  text-gray-800">Notifications</h3>
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
          px-3 sm:px-6 py-3 sm:py-6 rounded-lg shadow w-full 
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
          <p className="mt-1 text-sm font-semibold">
            Your Account Request Id is:-
            <span className="underline underline-offset-2 text-blue-900">
              {notification.data[0].account_id}.
            </span>
          </p>
        )}

        {/*Case:- Approved Notificaton*/}
        {notification.data && notification.type === "approved" && (
          <p className="mt-1 text-sm font-semibold">
            Your New Account Id is:-
            <span className="underline underline-offset-2 text-blue-900 ml-1">
              {notification.data[0].account_id}
            </span>
          </p>
        )}

        {/*Case:- New Transfer Balance Notificaton*/}
        {notification.data && notification.type === "transfered-in" && (
          <>
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
