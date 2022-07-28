import React from "react";
import { useDispatch } from "react-redux";
import { resetAuthStatus } from "../../state/features/User/Auth/authSlice";
import { UseResetStatus } from "../../hooks/UseResetStatus";
import Register from "../../components/forms/userForms/Register";

export const RegisterPage = () => {
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
    <div className="min-h-screen max-w-4xl w-full mx-auto flex justify-center  items-center flex-col lg:flex-row gap-4 p-4 md:p-10">
      <Register className="w-full" />
    </div>
  );
};
