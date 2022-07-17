import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetAccountStatus } from "../features/Account/AccountSlice";
import { logout, resetAuthStatus } from "../features/Auth/authSlice";
import { resetUserStatus, userLogout } from "../features/User/userSlice";
import { UseResetStatus } from "../hooks/UseResetStatus";

export default function Home() {
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);

  //clean up user status on unmount
  UseResetStatus(() => {
    return () => {
      dispatch(resetUserStatus());
      dispatch(resetAuthStatus());
    };
  });

  //logout function
  const handleLogout = () => {
    dispatch(logout());
    dispatch(userLogout());
    dispatch(resetUserStatus());
    dispatch(resetAuthStatus());
    dispatch(resetAccountStatus());
    naviagte("/login");
  };
  return (
    <div className="text-center text-blue-800">
      <p>Home</p>
      <button className="bg-red-800 text-white" onClick={handleLogout}>
        Logout
      </button>
      {user && (
        <Link className="block" to={`/profile/${user.id}`}>
          Go to profile
        </Link>
      )}
      {user && (
        <Link className="block" to={`/notifications`}>
          See Notification
        </Link>
      )}
      {user && (
        <Link className="block" to={`/choose-account`}>
          Go to Account
        </Link>
      )}
      {user && (
        <Link className="block" to={`/account-request`}>
          Request Account
        </Link>
      )}
    </div>
  );
}
