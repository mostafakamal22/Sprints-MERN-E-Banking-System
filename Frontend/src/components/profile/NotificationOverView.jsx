import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

export const NotificationOverView = () => {
  //Get Notifications from state
  const notifications = useSelector(
    (state) => state.userData.info.notifications
  );

  return (
    <div className="h-screen grid place-items-center my-8">
      <div className="h-full overflow-y-auto lg:w-1/2 sm:w-3/5 w-11/12 bg-gray-100  rounded-xl mx-auto border px-4 py-6  sm:p-10 shadow-sm">
        {/* Heading */}
        <div className="inline-flex items-center justify-between w-full mb-4">
          <h3 className="font-bold text-xl sm:text-2xl text-gray-800">
            Notifications
          </h3>
          <Link
            to={"/"}
            className="inline-flex font-bold text-xs sm:text-sm bg-white px-2 sm:px-3 py-2 text-blue-500 items-center rounded
         shadow  focus:outline-none hover:bg-blue-500 hover:text-white
          "
          >
            <BiArrowBack className="mb-[-1px] mr-1 font-bold" size={15} />
            Go Back
          </Link>
        </div>

        {/* If there no notifications */}
        {!notifications ||
          (notifications.length === 0 && (
            <div className="mt-2 px-6 py-4 bg-blue-200 font-semibold rounded-lg shadow w-full select-none">
              You Do not Have Any Notifications!
            </div>
          ))}

        {/* display all notifications */}
        {notifications &&
          notifications.length > 0 &&
          notifications.map((notification) => (
            <div
              className={`mt-2 px-4 sm:px-6 py-4  rounded-lg shadow w-full select-none
              hover:bg-gray-500 
                ${notification.isSeen && "bg-white"}
                ${!notification.isSeen && "bg-gray-300"}
              `}
              key={notification._id}
            >
              <Link
                to={`/notifications/${notification._id}`}
                className=" inline-flex items-center justify-between w-full"
              >
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
              </Link>
              <p className="mt-1 text-sm">You have a new notification</p>
            </div>
          ))}
      </div>
    </div>
  );
};
