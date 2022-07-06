import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useEffect } from "react";

export const Notification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //get notification id from pathname
  const notificationId = location.pathname.split("/").at(-1);
  //Get Notifications from state
  const notifications = useSelector(
    (state) => state.userData.info.notifications
  );

  let notification;

  useEffect(() => {
    //check notifiaction exist in notification list
    if (!notifications.find((n) => n._id === notificationId)) {
      //if not exist go to notifications page
      navigate("/notifications");
    }
  }, []);

  notification = notifications.find((n) => n._id === notificationId);

  return (
    <div className="h-screen grid place-items-center my-8">
      <div className="h-full overflow-y-auto lg:w-1/2 sm:w-3/5 w-11/12 bg-gray-100  rounded-xl mx-auto border px-4 py-6  sm:p-10 shadow-sm">
        {/* Heading */}
        <div className="inline-flex items-center justify-between w-full mb-4">
          <h3 className="font-bold text-xl sm:text-2xl text-gray-800">
            Notifications
          </h3>
          <Link
            to={"/notifications"}
            className="inline-flex font-bold text-xs sm:text-sm bg-white px-2 sm:px-3 py-2 text-blue-500 items-center rounded
         shadow  focus:outline-none hover:bg-blue-500 hover:text-white
          "
          >
            <BiArrowBack className="mb-[-1px] mr-1 font-bold" size={15} />
            Go Back
          </Link>
        </div>

        {/* display notification detail */}
        <div
          className={`
        ${notification.type === "account-request" && "bg-blue-200"}
        ${
          (notification.type === "approved" ||
            notification.type === "transfered-in") &&
          "bg-green-200"
        }
        ${notification.type === "declined" && "bg-red-200"}
        min-h-[200px] mt-2 px-4 sm:px-6 py-4  rounded-lg shadow w-full 
        `}
        >
          <div className=" inline-flex items-center justify-between w-full">
            <div className="inline-flex items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/893/893257.png"
                alt="Messages Icon"
                className="w-6 h-6 mr-3"
              ></img>
              <h3 className="font-bold text-base text-gray-800">
                {notification.title}
              </h3>
            </div>
            <p className="text-xs font-semibold text-blue-900">
              {moment(notification.createdAt).fromNow()}
            </p>
          </div>
          <p className="mt-1 text-sm">{notification.message}</p>

          {/* display notificaton data */}

          {/*case:- account request notificaton*/}
          {notification.data && notification.type === "account-request" && (
            <p className="mt-1 text-sm">
              {" "}
              Your Account Request Id is:-
              <span className="underline underline-offset-2 text-blue-900">
                {notification.data[0].account_id}
              </span>
            </p>
          )}

          {/*case:- approved notificaton*/}
          {notification.data && notification.type === "approved" && (
            <p className="mt-1 text-sm">
              {" "}
              Your New Account Id is:-
              <span className="underline underline-offset-2 text-blue-900">
                {notification.data[0].account_id}
              </span>
            </p>
          )}

          {/*case:- approved notificaton*/}
          {notification.data && notification.type === "transfered-in" && (
            <>
              <p className="mt-1 text-sm font-semibold">
                {" "}
                New Balance Transfered:-{" "}
                <span className="underline underline-offset-2 text-blue-900">
                  {notification.data[0].transfered_Amount} L.E
                </span>
              </p>
              <p className="mt-1 text-sm font-semibold">
                {" "}
                From:-{" "}
                <span className="underline underline-offset-2 text-blue-900">
                  {notification.data[0].from}
                </span>
              </p>
            </>
          )}

          {/*case:- declined notificaton*/}
          {notification.data && notification.type === "declined" && (
            <>
              <p className="mt-1 text-sm font-semibold">
                {" "}
                Your Initial Balance Was:-{" "}
                <span className="underline underline-offset-2 text-blue-900">
                  {notification.data[0].initial_balance} L.E
                </span>
              </p>
              <p className="mt-1 text-sm font-semibold">
                {" "}
                Retreive Initial Balance:-{" "}
                <span className="underline underline-offset-2 text-blue-900">
                  <Link to="/retreive">From Here</Link>
                </span>
              </p>
              <p className="mt-1 text-sm font-semibold">
                {" "}
                Contact Us:-{" "}
                <span className="underline underline-offset-2 text-blue-900">
                  <Link to="/contact">From Here</Link>
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
