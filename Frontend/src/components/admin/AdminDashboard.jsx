import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  adminLogout,
  resetAdminAuthStatus,
} from "../../features/Admin/Auth/adminAuthSlice";

export default function AdminDashboard() {
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.adminAuth);

  //clean up admin status on unmount
  useEffect(() => {
    return () => {
      dispatch(resetAdminAuthStatus());
    };
  }, []);

  //logout function
  const handleLogout = () => {
    dispatch(adminLogout());
    dispatch(resetAdminAuthStatus());
    naviagte("/admins/login");
  };
  return (
    <div className="text-center text-blue-800">
      <p>Admin Dashboard</p>
      <button className="bg-red-800 text-white" onClick={handleLogout}>
        Logout
      </button>
      {info && <Link to={`/profile/${info.id}`}>Go to profile</Link>}
    </div>
  );
}
