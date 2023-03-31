import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { notificationUpdate } from "../../state/features/User/UserData/userSlice";
import { FcHighPriority, FcIdea, FcNoIdea, FcOk } from "react-icons/fc";
import { PaginationNotificationsList } from "../helpers/PaginationNotificationsList";

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

  const oneNotification = (notification) => {
    return (
      <div
        className={`max-w-xl mx-auto mt-2 px-4 sm:px-6 py-4  rounded-lg shadow w-full select-none
hover:bg-blue-300 focus:bg-blue-300  active:bg-blue-300 
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
    );
  };

  return (
    <div className="max-w-5xl w-full min-h-screen">
      <div className="h-full w-full">
        {/* Heading */}
        <h3 className="flex justify-center items-center text-2xl text-center font-bold px-2 py-4 mb-10 bg-blue-200 border-b-4 border-blue-800 rounded shadow">
          <FcIdea className="mr-1" size={50} />
          <span>Notifications</span>
        </h3>

        {/* If there no notifications */}
        {!notifications ||
          (notifications.length === 0 && (
            <div className="max-w-2xl w-full mx-auto my-4 flex flex-col gap-4 items-center justify-center flex-wrap  bg-pink-100 p-4 border-2 border-pink-800 rounded shadow">
              <FcNoIdea size={60} />
              <p className="text-gray-800 text-base font-semibold">
                You do not have any Notifications!
              </p>
            </div>
          ))}

        {/* Display All Notifications */}
        {notifications && notifications.length > 0 && (
          <PaginationNotificationsList
            oneNotification={oneNotification}
            notifications={notifications.slice(0).reverse()}
            rowsPerPage={10}
          />
        )}
      </div>
    </div>
  );
};
