import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { notificationUpdate } from "../../features/User/userSlice";
import { FcHighPriority, FcIdea, FcOk } from "react-icons/fc";

export const NotificationOverView = () => {
  const dispatch = useDispatch();

  //Get Notifications from state
  const notifications = useSelector(
    (state) => state.userData.info.notifications
  );

  //Get user data
  const { user } = useSelector((state) => state.userAuth);

  const handleClick = (notification) => {
    //check if notification is already been seen
    if (notification.isSeen) return;

    //if not seen then dispatch notification update
    const payload = {
      notificationId: notification._id,
      token: user.token,
    };

    dispatch(notificationUpdate(payload));
  };

  return (
    <div className="max-w-5xl w-full p-6 bg-slate-50 rounded shadow-lg shadow-black/30">
      <div className="h-full w-full  px-4 py-6  sm:p-10 ">
        {/* Heading */}

        <h3 className="flex justify-center items-center text-xl text-center font-bold px-2 py-4 mb-10 bg-blue-200 border-b-4 border-blue-800 rounded shadow">
          <FcIdea className="mr-1" size={50} />

          <span>Notifications</span>
        </h3>

        {/* If there no notifications */}
        {!notifications ||
          (notifications.length === 0 && (
            <div className="mt-2 px-6 py-4 bg-blue-200 font-semibold border-b-4 border-blue-800 rounded-lg shadow w-full select-none">
              You Do not Have Any Notifications!
            </div>
          ))}

        {/* display all notifications */}
        {notifications &&
          notifications.length > 0 &&
          notifications
            .slice(0)
            .reverse()
            .map((notification) => (
              <div
                className={`mt-2 px-4 sm:px-6 py-4  rounded-lg shadow w-full select-none
              hover:bg-gray-500 
                ${notification.isSeen && "bg-white"}
                ${!notification.isSeen && "bg-gray-300"}
              `}
                key={notification._id}
              >
                <Link
                  onClick={() => handleClick(notification)}
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
                <p className="flex mt-1 text-sm">
                  {!notification.isSeen && (
                    <>
                      <span>You have a new notification</span>
                      <FcHighPriority className="ml-1" size={20} />
                    </>
                  )}

                  {notification.isSeen && (
                    <>
                      <FcOk className="ml-auto" size={20} />
                    </>
                  )}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};
