import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/Auth/authSlice";

useSelector;
export default function Home() {
  const user = localStorage.getItem("user");
  console.log(user);

  const naviagte = useNavigate();
  const dispatch = useDispatch();

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
    </div>
  );
}
