import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  adminLogout,
  resetAdminAuthStatus,
} from "../../features/Admin/Auth/adminAuthSlice";
import AdminListControl from "./AdminListControl";
import { DashboardNavbar } from "./DashboardNavbar";
import { UsersListControl } from "./UsersListControl";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("usersList");
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
      <h2>Admin Dashboard</h2>
      <button className="bg-red-800 text-white" onClick={handleLogout}>
        Logout
      </button>
      {info && <Link to={`/admins/profile/${info.id}`}>Go to profile</Link>}

      {/* admin dashboard navabr */}
      <DashboardNavbar setActiveTab={setActiveTab} />

      {/* admins control panel */}
      {activeTab === "adminsList" && <AdminListControl />}

      {/* users control panel */}
      {activeTab === "usersList" && <UsersListControl />}

      {/* users Account Request*/}
    </div>
  );
}
