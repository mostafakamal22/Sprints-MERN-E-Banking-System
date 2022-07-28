import React from "react";
import { useDispatch } from "react-redux";
import AdminLogin from "../../components/forms/adminForms/AdminLogin";
import { resetAdminAuthStatus } from "../../state/features/Admin/Auth/adminAuthSlice";
import { UseResetStatus } from "../../hooks/UseResetStatus";

export const AdminLoginPage = () => {
  const dispatch = useDispatch();

  //clean up  status (on mount, unmount)
  UseResetStatus(() => {
    dispatch(resetAdminAuthStatus());
  });

  UseResetStatus(() => {
    return () => {
      dispatch(resetAdminAuthStatus());
    };
  });
  return (
    <div className="min-h-screen flex justify-center items-center p-4 md:p-10">
      <AdminLogin />
    </div>
  );
};
