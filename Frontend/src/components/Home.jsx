import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/Auth/authSlice";

export default function Home() {
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  //logout function
  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
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
