import React from "react";
import { useDispatch } from "react-redux";
import Login from "../../components/forms/Login";
import { resetAuthStatus } from "../../features/Auth/authSlice";
import { UseResetStatus } from "../../hooks/UseResetStatus";

export const UserLoginPage = () => {
  const dispatch = useDispatch();

  //clean up  status (on mount, unmount)
  UseResetStatus(() => {
    dispatch(resetAuthStatus());
  });
  UseResetStatus(() => {
    return () => {
      dispatch(resetAuthStatus());
    };
  });

  return (
    <div className="min-h-screen flex justify-center items-center  p-4 md:p-10">
      <Login />
    </div>
  );
};
