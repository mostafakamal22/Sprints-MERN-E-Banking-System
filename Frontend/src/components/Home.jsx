import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, resetAuthStatus } from "../features/Auth/authSlice";
import { resetUserStatus, userLogout } from "../features/User/userSlice";

export default function Home() {
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  //clean up user status on unmount
  useEffect(() => {
    return () => {
      dispatch(resetUserStatus());
      dispatch(resetAuthStatus());
    };
  }, []);

  //logout function
  const handleLogout = () => {
    dispatch(logout());
    dispatch(userLogout());
    dispatch(resetUserStatus());
    dispatch(resetAuthStatus());
    naviagte("/login");
  };
  return (
    <div className="text-center text-blue-800">
      <p>Home</p>
      <button className="bg-red-800 text-white" onClick={handleLogout}>
        Logout
      </button>
      {user && <Link to={`/profile/${user.id}`}>Go to profile</Link>}
    </div>
  );
}
