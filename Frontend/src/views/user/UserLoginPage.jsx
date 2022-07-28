import React from "react";
import { useDispatch } from "react-redux";
import Login from "../../components/forms/userForms/Login";
import { resetAuthStatus } from "../../state/features/User/Auth/authSlice";
import { UseResetStatus } from "../../hooks/UseResetStatus";
import { ReactComponent as LoginImg } from "../../assets/imgs/E-BANK-Login.svg";

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
    <div className="min-h-screen max-w-7xl w-full mx-auto flex items-center flex-col lg:flex-row gap-4 p-4 md:p-10">
      <Login />

      <div className="w-[70%] self-stretch hidden lg:flex justify-center items-center flex-col p-6 bg-slate-50/60 rounded-lg shadow">
        <h2 className="w-full p-6 text-center text-3xl !font-sans font-bold text-teal-600 italic bg-white border-y-4 border-blue-800 rounded shadow">
          E-bank is Everything You Need Now!
        </h2>
        <LoginImg className="max-w-md self-stretch h-full mx-auto" />
      </div>
    </div>
  );
};
